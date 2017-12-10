# bz-cli
Develop custom connectors for Bizagi Studio blazingly fast. With bz-cli you are now able to use develop wihout the connector editor developed by Bizagi.

## Installation
~~~
npm install bz-cli
~~~

## Create a new project
~~~~
bz new <appName>
~~~~
This will generate a new project with the following configuration:
### Template Stack
* [bz-define](https://www.npmjs.com/package/bz-define) to create the bizagi custom connector definition. You must check it to learn how to define the connector structure.
* [bz-zip](https://www.npmjs.com/package/bz-zip) to bundle the connector to a .bizc file.
* [Babel](https://babeljs.io/) for ES2015+ transpilation.
* [Mocha](https://mochajs.org/) + [Sinon](http://sinonjs.org/) + [Chai](http://chaijs.com/) for testing.

### Template Instructions
* Connector's actions should be in the `src` folder.
* Use `npm run dev` to transpile your actions.
* Write your actions' tests in the `test/unit-test` and `test/integration-test` folders accordingly and run them with `npm test`. If you want to be more specific: `npm run unit-test` and `npm run integration-test`
* Build your connector with `npm run build`.

## Adding Actions
To create a connector aciton use
~~~
bz generate-action <actionName>
~~~
The action file will be kebab-cased and located in the src folder of your project.
