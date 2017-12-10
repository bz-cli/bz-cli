# Bizagi Custom Connector #

## Stack ##
* [Babel](https://babeljs.io/) for ES6 transpilation.
* [Mocha](https://mochajs.org/) + [Sinon](http://sinonjs.org/) + [Chai](http://chaijs.com/) for testing.
* [bz-def](https://www.npmjs.com/package/bz-def) to create the bizagi custom connector definition.
* [bz-zip](https://www.npmjs.com/package/bz-zip) to bundle the connector to a .bizc file.

## Instructions ##
* Write your custom connector's actions in the `src` folder and transpile them with `npm run dev`.
* Write your actions' tests in the `test/unit-test` and `test/integration-test` folders accordingly and run them with `npm test`. If you want to be more specific: `npm run unit-test` and `npm run integration-test`
* Build your connector with `npm run build`.
