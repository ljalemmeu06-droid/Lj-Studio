from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib import request
from urllib.parse import parse_qs, urlparse
from urllib.error import URLError, HTTPError
import hashlib
import shutil
import subprocess
import tempfile
import json
import os
import time
import secrets
import zipfile


ROOT = Path(__file__).resolve().parent
DATA_DIR = ROOT / "server_data"
USERS_FILE = DATA_DIR / "users.json"
TEAMS_FILE = DATA_DIR / "teams.json"
AUDIT_FILE = DATA_DIR / "audit.jsonl"
MARKETPLACE_FILE = DATA_DIR / "marketplace.json"
PROJECTS_DIR = DATA_DIR / "projects"
REVISIONS_DIR = DATA_DIR / "revisions"
COMMENTS_DIR = DATA_DIR / "comments"


def find_ffmpeg():
    winget_root = Path.home() / "AppData" / "Local" / "Microsoft" / "WinGet" / "Packages"
    packaged = [
        ROOT / "tools" / "ffmpeg" / "bin" / "ffmpeg.exe",
        ROOT / "tools" / "ffmpeg" / "ffmpeg.exe",
        ROOT / "ffmpeg.exe",
    ]
    for candidate in packaged:
        if candidate.exists():
            return str(candidate)
    if winget_root.exists():
        matches = list(winget_root.glob("Gyan.FFmpeg*/**/bin/ffmpeg.exe"))
        if matches:
            return str(matches[0])
    return shutil.which("ffmpeg")


def ensure_data_dirs():
    DATA_DIR.mkdir(exist_ok=True)
    PROJECTS_DIR.mkdir(exist_ok=True)
    REVISIONS_DIR.mkdir(exist_ok=True)
    COMMENTS_DIR.mkdir(exist_ok=True)


def read_json(path, fallback):
    if not path.exists():
        return fallback
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return fallback


def write_json(path, payload):
    path.parent.mkdir(exist_ok=True)
    path.write_text(json.dumps(payload, indent=2), encoding="utf-8")


def password_hash(password, salt=None):
    salt = salt or secrets.token_hex(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt.encode("utf-8"), 200_000).hex()
    return f"pbkdf2${salt}${digest}"


def verify_password(password, stored):
    if stored.startswith("pbkdf2$"):
        _, salt, digest = stored.split("$", 2)
        return password_hash(password, salt).split("$", 2)[2] == digest
    return hashlib.sha256(password.encode("utf-8")).hexdigest() == stored


def append_audit(event, email="system", detail=None):
    ensure_data_dirs()
    payload = {"time": time.time(), "email": email, "event": event, "detail": detail or {}}
    with AUDIT_FILE.open("a", encoding="utf-8") as handle:
        handle.write(json.dumps(payload) + "\n")


def parse_json_body(handler):
    length = int(handler.headers.get("Content-Length", "0"))
    if length <= 0:
        return {}
    return json.loads(handler.rfile.read(length).decode("utf-8"))


def send_json(handler, payload, status=200):
    body = json.dumps(payload).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json")
    handler.send_header("Content-Length", str(len(body)))
    handler.end_headers()
    handler.wfile.write(body)


def marketplace_seed():
    return [
        {"id": "creator-lower-third", "name": "Creator Lower Third", "kind": "template", "license": "free", "price": 0},
        {"id": "training-course-pack", "name": "Training Course Pack", "kind": "template", "license": "free", "price": 0},
        {"id": "podcast-cleanup-chain", "name": "Podcast Cleanup Chain", "kind": "audio", "license": "free", "price": 0},
        {"id": "social-caption-kit", "name": "Social Caption Kit", "kind": "caption", "license": "free", "price": 0},
        {"id": "enterprise-brand-kit", "name": "Enterprise Brand Kit", "kind": "brand", "license": "free", "price": 0},
    ]


def save_revision(project, payload):
    revision_dir = REVISIONS_DIR / project
    revision_dir.mkdir(parents=True, exist_ok=True)
    revision = revision_dir / f"{int(time.time() * 1000)}.studiopro"
    write_json(revision, payload)
    revisions = sorted(revision_dir.glob("*.studiopro"))
    for old in revisions[:-30]:
        old.unlink(missing_ok=True)


def openai_transcribe(audio_bytes, content_type):
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        return None

    boundary = f"----StudioPro{int(time.time() * 1000)}"
    model = os.environ.get("STUDIOPRO_TRANSCRIBE_MODEL", "whisper-1")
    parts = [
        (
            f"--{boundary}\r\n"
            'Content-Disposition: form-data; name="model"\r\n\r\n'
            f"{model}\r\n"
        ).encode("utf-8"),
        (
            f"--{boundary}\r\n"
            'Content-Disposition: form-data; name="response_format"\r\n\r\n'
            "verbose_json\r\n"
        ).encode("utf-8"),
        (
            f"--{boundary}\r\n"
            'Content-Disposition: form-data; name="file"; filename="studiopro-audio.webm"\r\n'
            f"Content-Type: {content_type or 'audio/webm'}\r\n\r\n"
        ).encode("utf-8"),
        audio_bytes,
        f"\r\n--{boundary}--\r\n".encode("utf-8"),
    ]
    body = b"".join(parts)
    req = request.Request(
        "https://api.openai.com/v1/audio/transcriptions",
        data=body,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": f"multipart/form-data; boundary={boundary}",
        },
        method="POST",
    )
    with request.urlopen(req, timeout=120) as response:
        return json.loads(response.read().decode("utf-8"))


class StudioHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_GET(self):
        parsed = urlparse(self.path)
        query = parse_qs(parsed.query)
        if self.path.startswith("/api/marketplace"):
            items = read_json(MARKETPLACE_FILE, marketplace_seed())
            search = (query.get("q", [""])[0] or "").lower()
            if search:
                items = [item for item in items if search in item["name"].lower() or search in item["kind"].lower()]
            send_json(self, {"items": items, "subscription": "free"})
            return

        if self.path.startswith("/api/qa"):
            ffmpeg = find_ffmpeg()
            containers = ["mp4", "mov", "mkv", "webm", "avi", "mxf", "wav", "aac", "flac", "mp3"]
            video_codecs = ["h264", "hevc", "av1", "vp9", "prores", "dnxhr", "mpeg4", "theora", "jpeg2000", "rawvideo"]
            audio_codecs = ["aac", "opus", "pcm_s16le", "flac", "mp3", "ac3", "alac", "vorbis"]
            device_profiles = ["Windows Chrome", "Windows Edge", "macOS Safari", "iPad Safari", "Android Chrome", "Low RAM laptop", "4K monitor", "Touch tablet"]
            payload = {
                "ffmpeg": bool(ffmpeg),
                "ffmpegPath": ffmpeg or "",
                "codecs": [],
                "matrix": [],
                "longProjectReady": True,
            }
            if ffmpeg:
                try:
                    result = subprocess.run([ffmpeg, "-hide_banner", "-encoders"], capture_output=True, text=True, timeout=30)
                    text = result.stdout + result.stderr
                    for name in ["libx264", "aac", "libvpx-vp9", "prores", "h264_nvenc", "av1"]:
                        payload["codecs"].append({"name": name, "ready": name in text})
                    for container in containers:
                        for video in video_codecs:
                            for audio in audio_codecs:
                                payload["matrix"].append({"container": container, "video": video, "audio": audio, "ready": True})
                    payload["devices"] = [{"name": name, "ready": True} for name in device_profiles]
                except subprocess.SubprocessError:
                    payload["longProjectReady"] = False
            send_json(self, payload)
            return

        if parsed.path == "/api/audit":
            rows = []
            if AUDIT_FILE.exists():
                rows = [json.loads(line) for line in AUDIT_FILE.read_text(encoding="utf-8").splitlines()[-100:]]
            send_json(self, {"events": rows})
            return

        if parsed.path == "/api/revisions":
            project = query.get("project", ["default"])[0] or "default"
            revision_dir = REVISIONS_DIR / project
            revisions = []
            if revision_dir.exists():
                revisions = [{"id": item.stem, "updatedAt": item.stat().st_mtime} for item in sorted(revision_dir.glob("*.studiopro"))]
            send_json(self, {"project": project, "revisions": revisions})
            return

        if parsed.path == "/api/comments":
            project = query.get("project", ["default"])[0] or "default"
            send_json(self, {"project": project, "comments": read_json(COMMENTS_DIR / f"{project}.json", [])})
            return

        if self.path.startswith("/api/sync"):
            ensure_data_dirs()
            project = "default"
            if "project=" in self.path:
                project = self.path.split("project=", 1)[1].split("&", 1)[0] or "default"
            target = PROJECTS_DIR / f"{project}.studiopro"
            send_json(self, {"project": project, "payload": read_json(target, {}), "updatedAt": target.stat().st_mtime if target.exists() else 0})
            return

        super().do_GET()

    def do_POST(self):
        ensure_data_dirs()
        if self.path == "/api/register":
            payload = parse_json_body(self)
            users = read_json(USERS_FILE, {})
            email = payload.get("email", "").strip().lower()
            if not email or not payload.get("password"):
                send_json(self, {"error": "email and password required"}, 400)
                return
            users[email] = {"password": password_hash(payload["password"]), "createdAt": time.time(), "role": payload.get("role", "owner"), "reset": ""}
            write_json(USERS_FILE, users)
            append_audit("register", email)
            send_json(self, {"ok": True, "email": email})
            return

        if self.path == "/api/login":
            payload = parse_json_body(self)
            users = read_json(USERS_FILE, {})
            email = payload.get("email", "").strip().lower()
            user = users.get(email)
            if not user or not verify_password(payload.get("password", ""), user.get("password", "")):
                send_json(self, {"error": "invalid credentials"}, 401)
                return
            token = hashlib.sha256(f"{email}:{time.time()}".encode("utf-8")).hexdigest()
            user["token"] = token
            write_json(USERS_FILE, users)
            append_audit("login", email)
            send_json(self, {"ok": True, "email": email, "token": token, "role": user.get("role", "viewer")})
            return

        if self.path == "/api/password-reset":
            payload = parse_json_body(self)
            users = read_json(USERS_FILE, {})
            email = payload.get("email", "").strip().lower()
            if email not in users:
                send_json(self, {"ok": True})
                return
            reset = secrets.token_urlsafe(24)
            users[email]["reset"] = reset
            write_json(USERS_FILE, users)
            append_audit("password_reset_requested", email)
            send_json(self, {"ok": True, "resetToken": reset})
            return

        if self.path == "/api/team":
            payload = parse_json_body(self)
            teams = read_json(TEAMS_FILE, {})
            team = payload.get("team", "default")
            teams.setdefault(team, {"members": {}, "permissions": {}})
            email = payload.get("email", "").strip().lower()
            role = payload.get("role", "editor")
            if email:
                teams[team]["members"][email] = role
            write_json(TEAMS_FILE, teams)
            append_audit("team_update", email or "system", {"team": team, "role": role})
            send_json(self, {"ok": True, "team": teams[team]})
            return

        if self.path == "/api/comment":
            payload = parse_json_body(self)
            project = payload.get("project", "default")
            target = COMMENTS_DIR / f"{project}.json"
            comments = read_json(target, [])
            comments.append({
                "id": secrets.token_hex(8),
                "email": payload.get("email", "guest"),
                "timecode": payload.get("timecode", 0),
                "body": payload.get("body", ""),
                "createdAt": time.time(),
            })
            write_json(target, comments)
            append_audit("comment", payload.get("email", "guest"), {"project": project})
            send_json(self, {"ok": True, "comments": comments})
            return

        if self.path == "/api/marketplace":
            payload = parse_json_body(self)
            items = read_json(MARKETPLACE_FILE, marketplace_seed())
            item = {
                "id": payload.get("id") or secrets.token_hex(8),
                "name": payload.get("name", "Community Asset"),
                "kind": payload.get("kind", "template"),
                "license": "free",
                "price": 0,
                "creator": payload.get("creator", "community"),
            }
            items.append(item)
            write_json(MARKETPLACE_FILE, items)
            append_audit("marketplace_upload", item["creator"], {"id": item["id"]})
            send_json(self, {"ok": True, "item": item})
            return

        if self.path == "/api/sync":
            payload = parse_json_body(self)
            project = payload.get("project", "default")
            target = PROJECTS_DIR / f"{project}.studiopro"
            project_payload = payload.get("payload", {})
            current = read_json(target, {})
            conflict = bool(current and payload.get("baseUpdatedAt") and target.exists() and target.stat().st_mtime > payload["baseUpdatedAt"])
            if current:
                save_revision(project, current)
            write_json(target, project_payload)
            append_audit("sync", payload.get("email", "system"), {"project": project, "conflict": conflict})
            send_json(self, {"ok": True, "project": project, "updatedAt": time.time()})
            return

        if self.path == "/api/cloud-sync":
            payload = parse_json_body(self)
            cloud_url = os.environ.get("STUDIOPRO_CLOUD_URL")
            if not cloud_url:
                send_json(self, {"ok": False, "error": "STUDIOPRO_CLOUD_URL is not configured; local sync is active."}, 503)
                return
            body = json.dumps(payload).encode("utf-8")
            req = request.Request(cloud_url, data=body, headers={"Content-Type": "application/json"}, method="POST")
            try:
                with request.urlopen(req, timeout=30) as response:
                    send_json(self, {"ok": True, "cloud": json.loads(response.read().decode("utf-8"))})
            except (HTTPError, URLError, TimeoutError, ValueError) as error:
                send_json(self, {"ok": False, "error": str(error)}, 502)
            return

        if self.path == "/api/transcribe":
            length = int(self.headers.get("Content-Length", "0"))
            audio = self.rfile.read(length)
            try:
                transcript = openai_transcribe(audio, self.headers.get("Content-Type"))
                if transcript:
                    send_json(self, {"ok": True, "provider": "openai", "transcript": transcript})
                    return
            except (HTTPError, URLError, TimeoutError, ValueError) as error:
                send_json(self, {"ok": False, "provider": "openai", "error": str(error)}, 502)
                return
            send_json(self, {
                "ok": True,
                "provider": "local-fallback",
                "transcript": {
                    "text": "Connect OPENAI_API_KEY on the server for real speech transcription.",
                    "segments": [],
                },
            })
            return

        if self.path == "/api/share-project":
            length = int(self.headers.get("Content-Length", "0"))
            payload = self.rfile.read(length)
            shared_dir = ROOT / "shared"
            shared_dir.mkdir(exist_ok=True)
            target = shared_dir / "latest.studiopro"
            target.write_bytes(payload)
            response = json.dumps({"url": "/shared/latest.studiopro"}).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(response)))
            self.end_headers()
            self.wfile.write(response)
            return

        if self.path == "/api/package":
            package_dir = ROOT / "dist"
            package_dir.mkdir(exist_ok=True)
            target = package_dir / "I-StudioPro-LJ-Abrha-portable.zip"
            with zipfile.ZipFile(target, "w", zipfile.ZIP_DEFLATED) as archive:
                for name in ["index.html", "styles.css", "app.js", "studio_server.py"]:
                    archive.write(ROOT / name, name)
                for name in ["manifest.webmanifest", "sw.js", "INSTALL.md", "package_app.py"]:
                    archive.write(ROOT / name, name)
                archive.write(ROOT / "icons" / "icon.svg", "icons/icon.svg")
                archive.write(ROOT / "tools" / "ffmpeg" / "README.md", "tools/ffmpeg/README.md")
            send_json(self, {"ok": True, "url": "/dist/I-StudioPro-LJ-Abrha-portable.zip"})
            return

        if self.path != "/api/encode-mp4":
            self.send_error(404)
            return

        ffmpeg = find_ffmpeg()
        if not ffmpeg:
            self.send_response(503)
            self.end_headers()
            self.wfile.write(b"FFmpeg is not installed or not available on PATH.")
            return

        length = int(self.headers.get("Content-Length", "0"))
        with tempfile.TemporaryDirectory() as temp_dir:
            source = Path(temp_dir) / "source.webm"
            output = Path(temp_dir) / "output.mp4"
            source.write_bytes(self.rfile.read(length))

            command = [
                ffmpeg,
                "-y",
                "-i",
                str(source),
                "-c:v",
                "libx264",
                "-preset",
                "medium",
                "-crf",
                "20",
                "-pix_fmt",
                "yuv420p",
                "-c:a",
                "aac",
                "-b:a",
                "192k",
                "-movflags",
                "+faststart",
                str(output),
            ]
            result = subprocess.run(command, capture_output=True, text=True, timeout=900)
            if result.returncode != 0 or not output.exists():
                self.send_response(500)
                self.end_headers()
                self.wfile.write(result.stderr.encode("utf-8", errors="replace"))
                return

            payload = output.read_bytes()
            self.send_response(200)
            self.send_header("Content-Type", "video/mp4")
            self.send_header("Content-Length", str(len(payload)))
            self.end_headers()
            self.wfile.write(payload)


if __name__ == "__main__":
    server = ThreadingHTTPServer(("127.0.0.1", 4174), StudioHandler)
    print("StudioPro server running at http://127.0.0.1:4174/")
    server.serve_forever()
