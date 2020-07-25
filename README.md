# MemeType

MemeType is an angular web app that performs text transforms for various internet typing formats. The live app is running [here](https://memetype.brewinstallbuzzwords.com). See the blog post for this project [here](https://www.brewinstallbuzzwords.com/posts/meme-type).

![Screenshot](https://github.com/brew-install-buzzwords/meme-type/blob/develop/github-resources/app-screenshot.png)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Deployment

Run `npm run deploy` to deploy the project. This requires having write permissions to the AWS S3 bucket and setting the `$MEMETYPE_DIST_ID` environment variable to the AWS Cloudfront distribution ID.
