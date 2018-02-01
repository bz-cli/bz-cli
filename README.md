# bz-cli #
<p align="center">
  <!-- <img src="./BizagiStudio.png" alt="Bizagi Studio"/> -->
</p>
Develop custom connectors for Bizagi Studio blazingly fast. With bz-cli you are now able to develop without the connector editor from Bizagi. 🚀

## Installation ##
~~~
npm install bz-cli -g
~~~

## Create a new project ##
~~~
bz new <appName>
~~~
You can also set yarn as the package manager with:
~~~
bz new <appName> --yarn
~~~

This will generate a new project with the following configuration:
### Project Stack ###
* [Babel](https://babeljs.io/) for transpilation.
* [jest](https://facebook.github.io/jest/) for testing.
* [bz-define](https://www.npmjs.com/package/bz-define) to create the bizagi custom connector definition.
* [bz-zip](https://www.npmjs.com/package/bz-zip) to bundle the connector to a .bizc file.

### Project Structure ###
~~~
.
|-- .babelrc_____________________________# Babel Configuration
|-- .editorconfig________________________# Editor configuration for tab and spaces.
|-- README.md____________________________# README of the connector.
|-- bz.config.js_________________________# Configuration file for the contract.
|-- logo.js______________________________# File exporting a base64 image.
|-- map-contract.js______________________# Inputs and Outputs generator.
|-- package.json_________________________# npm configuration file.
|-- __tests__ ___________________________# Folder with <name>.test.js files
|   |-- common.js _______________________# Common functions used by all the test files.
|   |-- upload-file.test.js______________# Test example file. Use it as an example for future ones.
|-- build________________________________# Actual connector contents. DO NOT MODIFY.
|   |-- bizagiRouter.js
|   |-- actions
|   |-- auth
|   |   |-- auth.js
|   |-- etc
|       |-- config.js
|       |-- errors.js
|-- docs_________________________________# Docs generation related files
|   |-- doc-styles.js____________________# Docs Styles.
|   |-- generate-english-docs.js_________# Script to generate english docs.
|   |-- generate-spanish-docs.js_________# Script to generate spanish docs.
|   |-- index.js
|   |-- inputs.d.js______________________# English-Spanish Action Inputs descriptions dictionary.
|-- etc__________________________________# Folder needed to use bz-util. DO NOT MODIFY.
|   |-- config.js
|-- inputs_______________________________# Inputs mapping for bz-define. They should be generated using test files.
|   |-- index.js_________________________# Huge facade file to export action inputs mappings.
|   |-- upload-file.inputs.js
|-- outputs______________________________# Outputs mapping for bz-define. They should be generated using test files.
|   |-- index.js_________________________# Huge facade file to export action inputs mappings.
|   |-- upload-file.outputs.js
|-- src__________________________________# Actual code goes here: actions, utils, helpers, etc.
    |-- upload-file.js
~~~

## How to Use ##
* Write your custom connector's actions in the `src` folder and transpile them with `npm run dev`. Babel will put them for you in `build/actions`.
* You can write your tests in the `__tests__` folder and run them with `npm test` or `npm t`. The test file example I have generates the inputs and outputs mapping for that action and place them in their respective folders once its run. Use this as an example to create future ones.
* The inputs mapping will be placed in the `inputs` folder and exported with the `index.js` file.
* The inputs mapping will be placed in the `outputs` folder and exported with the `index.js` file.
* The files' names of actions should be the same as the action names in the `bz.config.js` file.
* Do not modify the `build` folder contents.
* Do not modify the `etc` folder contents.
* Run `npm run build` to compile the connector. A `Connector.bizc` file will be created as a result. Note: Always remember to increase the version of the package.
* Use `npm run clear` to delete temporary files of the compile process.

### Useful commands ###
* `bz generate-action <actionName>`: Generate a new custom connector action and its test.
* `bz generate-service <serviceName>`: Generate a new service class.
* `bz generate-repository <repositoryName>`: Generate a new repository class.
* `bz generate-http`: Generate a new Http module.

## Configuration ##
### bz-define ###
This project uses [bz-define](https://www.npmjs.com/package/bz-define) to create the backbone of the connector using a `bz.config.js` file located in the root of the project. The `bz.config.js` file contains all the information Bizagi needs to read in order to use it.

This is a brief summary of the properties of the bzconfig object. See the interface for all the details.

#### Bz Config ####
| Property        | Description                                                                              |
| ----------------| -----------------------------------------------------------------------------------------|
| name            | Name of the connector.                                                                   |
| serviceName     | Name to display in the documentation.                                                    |
| description     | What does this connector is supposed to accomplish.                                      |
| explanation-en  | A short summary of what the service you are connecting to is about.                      |
| explanation-es  | A short summary of what the service you are connecting to is about.                      |
| url             | URL of the service docs.                                                                 |
| icon            | A base64 image string.                                                                   |
| author          | Who is creating this project.                                                            |
| version         | Semantic versioning. Current version of the project.                                     |
| actions         | An array of the actions the connector provides. [See Actions]                            |
| auth            | An array of auth properties that repensents what you need to configure in Bizagi Studio. |

#### Actions ####
| Property        | Description                            |
| ----------------| ---------------------------------------|
| name            | Name of the action (dash-cased).       |
| description-en  | Action description in english.         |
| description-es  | Action description in spanish.         |
| inputs          | Array of inputs. [See Inputs/Outputs]  |
| outputs         | Array of outputs. [See Inputs/Outputs] |

#### Inputs/Outputs ####
| Property        | Description                                                                        |
| ----------------| -----------------------------------------------------------------------------------|
| name            | Name of the action input/output.                                                   |
| description-en  | Input/Output description in english.                                               |
| description-es  | Input/Output description in spanish.                                               |
| type            | 'integer' | 'decimal' | 'string' | 'boolean' | 'date' | 'time' | 'byte' | 'object' |
| qty             | Quantity. Either 'single' or 'list'                                                |
| props           | Nested Input/Output. Required if type is 'object'.                                 |

#### Auth Properties #####
| Property        | Description                      |
| ----------------| ---------------------------------|
| name            | Name of the property.            |
| required        | Value is required.               |
| hide            | Value should be encrypted.       |
| description-en  | Property description in english. |
| description-es  | Property description in spanish. |

Using Typescript we can define the contract as it follows:
~~~
interface BzConfig {
  /**
   * Name of the connector.
   * The standard is to use a name such as 'bz-something', like 'bz-docker' for example.
   */
  name: string;

  /*
   * Name to display in the documentation.
   * if the name is 'bz-docker' then the serviceName should be something like 'Docker Remote API'.
   */
  serviceName: string;

  /**
   * What does this connector is supposed to accomplish.
   */
  description: string;

  /**
   * A short summary of what the service you are connecting to is about.
   * This is used in the english docs.
   */
  'explanation-en': string;

  /**
   * A short summary of what the service you are connecting to is about.
   * This is used in the spanish docs.
   */
  'explanation-es': string;

  /**
   * URL of the service docs.
   */
  url: string;

  /**
   * A base64 image string.
   */
  icon: string;

  /**
   * Who is creating this project.
   */
  author: string;

  /**
   * Semantic versioning. Current version of the project.
   * ALWAYS REMEMBER TO INCREASE THIS VALUE BY 1 EVERYTIME YO UWANT TO IMPORT IT TO BIZAGI STUDIO.
   */
  version: string;

  /**
   * An array of the actions the connector provides.
   */
  actions:
    {
      /**
       * The name should be dashcased and should be the same as the filename that contains the action (this is the only way Bizagi Studio finds it).
       */
      name: string;

      /**
       * Every action needs a description in english.
       * This is used in the english docs.
       */
      'description-en': string;

      /**
       * Every action needs a description in spanish.
       * This is used in the spanish docs.
       */
      'description-es': string;

      /**
       * Every action has inputs. See the ActionIO interface to understand how to structure them.
       * If the action doesn't have inputs, place and empty array [].
       */
      inputs: ActionIO[];

      /**
       * Every action has outputs. See the ActionIO interface to understand how to structure them.
       */
      outputs: ActionIO[];
  }[];

  /**
   * An array of auth properties that repensents what you need to configure in Bizagi Studio.
   */
  auth: {
    /**
     * Name of the authentication property.
     */
    name: string;

    /**
     * If this value required.
     */
    required: boolean;

    /**
     * Should the value be encrypted by Bizagi.
     */
    hide: boolean;

    /**
     * What this property means.
     * This is used in the english docs.
     */
    'description-en': string;

    /**
     * What this property means.
     * This is used in the spanish docs.
     */
    'description-es': string;
  }[];
}

interface ActionIO {
  /**
   * The name of the action and also the name of the file that executes such actions.
   * It should not contain special characters.
   */
  name: string;

  /**
   * The type of input this represents
   */
  type: 'integer' | 'decimal' | 'string' | 'boolean' | 'date' | 'time' | 'byte' | 'object';

  /**
   * boolean to indicate if Is this an unique input or an array.
   */
  qty: 'single' | 'list';

  /**
   * If you have 'object' as type then you will need to provide the properties as a nested ActionIO with the same structure.
   * This is ignored type has any other value.
   * You cannot have this array empty if the type is 'object'. It must have a key at least.
   */
  props?: ActionIO[];
}
~~~

## Generating the documentation ##
bz-cli allows you to generate most of the documentation in english and spanish for the project. In order to do this you must fill a dictionary in the `inputs.d.js` file located in the `docs` directory.

The dictionary is used to read the description of every input of every action described in the `bz.config.js` file. and it must follows the following structure:
~~~
module.exports = {
  /**
   * Each key is an action name.
   */
  'upload-file': {
    /*
     * Each input is an object with both the descriptions as its keys.
     */
    Image: {
      en: 'Input description in english',
      es: 'Input description in spanish'
    }
  },
  /* Other actions */
~~~

Once you have a dictionary ready, you can run `npm run docs-en` to generate the english docs and `npm run docs-es` to generate the spanish ones. You will obtain a word file in the root of your project.
