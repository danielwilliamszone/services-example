# services-example

## Installation

Can be [installed directly from GitHub](https://docs.npmjs.com/cli/install), with the desired [Git tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging) affixed:

`npm i git+https://git@github.com/danielwilliamszone/services-example.git#v1.0.5`

`npm i git+https://git@github.com/danielwilliamszone/services-example.git#v1.0.6`

Which adds it to the `package.json` using the repo name:

```
"dependencies": {
  "services-example": "git+https://git@github.com/danielwilliamszone/services-example.git#v1.0.6"
  ...
}
```

To **upgrade**, first run `npm uninstall services-example` then install the version of your choosing, as above.

## Usage

Individual services can be imported like so:

```
import getEthnicityCodes from 'services-example/dist/services/codes/ethnicity';

const getAllCodes = async () => {
  const [
    ethnicity,
    ...
  ] = await Promise.all([
    getEthnicityCodes(),
    ...
  ]);

  return {
    ethnicity,
    ...
  };
};

export default getAllCodes;
```

## build

To build the project, run `npm build`. This will transpile the ES6 to ES5 using [Babel](https://babeljs.io/).

## test

To run the [Jest](https://jestjs.io/) tests, run `npm run test` into the `dist` folder, to be committed and deployed to GitHub.

`@babel/polyfill` is imported in tests that have async code, to get around the `ReferenceError: regeneratorRuntime is not defined` error.
