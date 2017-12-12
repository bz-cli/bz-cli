# Bizagi Custom Connector #

## Stack ##
* [Babel](https://babeljs.io/) for transpilation.
* [jest](https://facebook.github.io/jest/) for testing.
* [bz-define](https://www.npmjs.com/package/bz-define) to create the bizagi custom connector definition.
* [bz-zip](https://www.npmjs.com/package/bz-zip) to bundle the connector to a .bizc file.

## Instructions ##
* Write your custom connector's actions in the `src` folder and transpile them with `npm run dev`.
* Write your actions' __tests__ and run them with `npm test` or `npm t`.
* Build your connector with `npm run build`.
