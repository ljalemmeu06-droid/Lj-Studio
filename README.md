# Updated Studio Software

Updated Studio Software is a local, browser-based studio app for recording, editing, captioning, exporting, and packaging media projects.

The app runs locally through a small Python server at `http://127.0.0.1:4174/`.

## Features

- Timeline editing
- Media import
- Captions and export tools
- Photo export
- Local project package tools
- Optional local FFmpeg support

## Free subscription

This project is intended to support a free public app model, including a free trial/subscription period for users.

## Run from source

```powershell
cd src
python studio_server.py
```

Then open:

```text
http://127.0.0.1:4174/
```

## Build installer ZIP

```powershell
powershell -ExecutionPolicy Bypass -File scripts/build-installer.ps1
```

The installer ZIP will be created in `dist/`.

## Code signing

The open-source signing path is documented in `OPEN_SOURCE_SIGNING_PATH.md`.

The intended free route is SignPath Foundation:

- https://signpath.org/
- https://signpath.org/apply.html

## Privacy

See `PRIVACY.md`.

## Security

See `SECURITY.md`.

## License

MIT License. See `LICENSE`.
