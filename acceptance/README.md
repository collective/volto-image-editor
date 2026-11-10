# Playwright acceptance tests

End-to-end acceptance tests driven by [Playwright](https://playwright.dev/),
running against a Plone **acceptance** backend (with `RobotRemote` enabled, so
the backend can be reset between tests) and a running Volto frontend.

They live in `tests/` and are configured through
`../playwright.config.ts`.

## Layout

- `tests/reset-fixture.ts` — `setup`/`teardown` helpers that call `RobotRemote`
  to reset the backend ZODB to the `VOLTO_ROBOT_TESTING` baseline.
- `tests/test.ts` — the extended `test`/`expect`. Provides an auto `resetBackend`
  fixture that tears down and sets up the backend around every test.
- `tests/login.ts` — `login(page)`, authenticates via `@login` and sets the
  `auth_token` cookie.
- `tests/content.ts` — `createContent(...)`, creates content through the REST
  API.
- `tests/editor.ts` — the steps the image editor tests share: opening the add
  form, uploading an image, opening and saving the editor, reading the preview
  and the stored image, and measuring the cropper layout.
- `tests/images.ts` — `makePNG(width, height)`, builds the test images at
  runtime, so no binary fixture is needed.
- `tests/*.test.ts` — the tests themselves.

## Configuration

The helpers read the following environment variables (with sensible defaults for
the acceptance backend):

- `BACKEND_HOST` (default `127.0.0.1`)
- `SITE_ID` (default `plone`)
- `API_PATH` (default `http://${BACKEND_HOST}:55001/${SITE_ID}`)
- `FRONTEND_URL` (default `http://localhost:3000`)

## Running locally

The first time, install the browser used by Playwright:

```shell
make install-acceptance
```

Start the servers, each in its own terminal session:

```shell
make acceptance-frontend-dev-start
```

```shell
make acceptance-backend-start
```

Then open the interactive runner:

```shell
make acceptance-test
```

Or run the suite headless:

```shell
make ci-acceptance-test
```
