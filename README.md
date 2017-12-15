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
* [Babel](https://babeljs.io/) for transpilation.
* [jest](https://facebook.github.io/jest/) for testing.
* [bz-define](https://www.npmjs.com/package/bz-define) to create the bizagi custom connector definition.
* [bz-zip](https://www.npmjs.com/package/bz-zip) to bundle the connector to a .bizc file.

## Template Instructions ##
* Write your custom connector's actions in the `src` folder and transpile them with `npm run dev` and put them in `build/actions` for you.
* Write your tests in the `__tests__` folder. Run them with `npm test` or `npm t`.
* Build your connector with `npm run build`. A `Connector.bizc` file will be created as a result.

## Adding Actions
To create a connector aciton use
~~~
bz generate-action <actionName>
~~~
The action file will be kebab-cased and located in the src folder of your project.
