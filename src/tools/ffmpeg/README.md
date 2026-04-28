# StudioPro FFmpeg package slot

Place `ffmpeg.exe` in one of these locations to enable automatic MP4 export:

- `tools/ffmpeg/bin/ffmpeg.exe`
- `tools/ffmpeg/ffmpeg.exe`
- `ffmpeg.exe` in the app root

When present, `studio_server.py` uses it through `/api/encode-mp4` to transcode browser-rendered WebM exports into H.264/AAC MP4.
