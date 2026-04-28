# Mobile packaging

Lj-Studio now supports two mobile paths:

1. Progressive Web App (PWA)
2. Native Android/iOS wrapper through Capacitor

## PWA path

Host the `src/` folder on HTTPS. Then users can open the website on a phone and use:

- Android Chrome: menu > Install app
- iPhone Safari: Share > Add to Home Screen

Included PWA files:

- `src/manifest.webmanifest`
- `src/sw.js`
- `src/icons/icon.svg`

## Android path

Requirements:

- Node.js
- Android Studio
- Java/JDK from Android Studio setup

Commands:

```powershell
npm install
npm run cap:add:android
npm run cap:open:android
```

Then build/sign the Android app in Android Studio.

## Android GitHub Actions build

The repository includes `.github/workflows/mobile-build.yml`.

Run it from GitHub:

1. Open the repository.
2. Go to Actions.
3. Select `Build mobile packages`.
4. Click `Run workflow`.
5. Download the `lj-studio-android-debug-apk` artifact.

This APK is for testing. For public release through Google Play, build a signed release APK/AAB with your Android signing key.

## iOS path

Requirements:

- macOS
- Xcode
- Apple Developer account
- Node.js

Commands:

```bash
npm install
npm run cap:add:ios
npm run cap:open:ios
```

Then build/sign the iOS app in Xcode.

## iOS GitHub Actions output

The mobile workflow can prepare and upload an Xcode project artifact named `lj-studio-ios-xcode-project`.

Apple requires signing through Xcode and an Apple Developer account before distributing an iOS app.

## Important mobile limitation

The Windows desktop installer starts `studio_server.py` locally. Phones do not run that Windows installer. For full API features on mobile, deploy the backend endpoints to a hosted HTTPS server or adapt those features to run fully in the browser.

The PWA/mobile wrapper still gives customers an installable mobile app shell for browser-supported editing, project, and media features.
