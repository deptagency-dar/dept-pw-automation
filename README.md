# dept-pw-automation
Playwright automation framework

# Install:

> npm install

> npx playwright@latest install

# Run scripts:

> npm run test:chromium
         
> npm run test:firefox

>  npm run test:chrome

> npm run test:edge

> npm run test:mobilechrome

> npm run test:mobilesafari

> npm run test:webkit

# Workaround login (Generating auth.json file)

> run `npx playwright codegen --save-storage=auth.json`
> It will open Chromium
> Paste the dept-central URL: https://dept-central-client-mlbp.vercel.app/
> Login manually
> Home page will be displayed
> Close the browser
> Storage will be saved on `auth.json` file