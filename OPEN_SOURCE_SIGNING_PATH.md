# Free open-source code signing path

The best free path for Windows code signing is SignPath Foundation.

## What SignPath Foundation can provide

SignPath Foundation can provide free code signing for qualifying open-source projects. The signed certificate is issued under SignPath Foundation, and SignPath verifies that the binary was built from the public open-source repository.

## What your project must have first

1. A public source code repository, usually GitHub.
2. An OSI-approved open-source license, such as MIT, Apache-2.0, or GPL-3.0.
3. No proprietary closed-source code in the signed app package.
4. A public release/download page that explains what the app does.
5. A privacy policy.
6. A repeatable build process, preferably GitHub Actions.
7. A released installer artifact that is built from the public repository.
8. Project maintainers who control the source code and build scripts.

## Important for I-smart energy and Updated Studio Software

Your free 6-month subscription can still exist, but the code that is being signed must be open source if you want the free SignPath Foundation route.

Do not upload only ZIP files with no source code. SignPath needs to verify the link between source code and the installer artifact.

## Recommended route

1. Create a public GitHub repository for Updated Studio Software.
2. Add the source files:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `studio_server.py`
   - installer scripts
   - any required tools or documented download steps
3. Add an open-source license.
4. Add `PRIVACY.md`.
5. Add a GitHub Actions workflow that builds the installer ZIP.
6. Publish the first GitHub Release.
7. Apply to SignPath Foundation.
8. After approval, connect SignPath to the release build and sign future installers.

## SignPath application links

- SignPath Foundation: https://signpath.org/
- Apply: https://signpath.org/apply.html
- Conditions: https://signpath.org/terms.html
- Open-source product page: https://about.signpath.io/product/open-source

## What I can prepare next

I can create the GitHub-ready project files locally:

- `LICENSE`
- `README.md`
- `PRIVACY.md`
- `SECURITY.md`
- GitHub Actions build workflow
- release notes
- installer build script

After that, you would publish the repository publicly and submit it to SignPath.
