const fs = require('fs');
const path = require('path');
const stringify = require('stringify-object');
/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
const omitEmpty = require('omit-empty');
const _ = require('lodash');

const getType = (x) => {
  let type;

  if (_.isNumber(x)) {
    type = _.isInteger(x) ? 'integer' : 'decimal';
  }

  if (typeof x === 'boolean') {
    type = 'boolean';
  }

  if (typeof x === 'string') {
    type = 'string';
  }

  return type;
};

/* eslint-disable */
const buildContract = ([ key, value ], isPrimitive) => {
  // Case: Single Primitive
  if (isPrimitive) {
    return {
      name: key,
      type: getType(value),
      qty: 'single'
    };
  } else {
    if (!_.isArray(value)) {
      // Case: Single Object
      return {
        name: key,
        type: 'object',
        qty: 'single',
        props: _.entries(value).map((entry) => buildContract(entry, !_.isObject(entry[1])))
      };
    } else {
      const sample = value[0];
      if (!_.isObject(sample)) {
        // Case: Primitive Array
        return {
          name: key,
          type: getType(sample),
          qty: 'list'
        };
      } else {
        // Case: Object Array
        return {
          name: key,
          type: 'object',
          qty: 'list',
          props: _.entries(sample).map((entry) => buildContract(entry, !_.isObject(entry[1])))
        };
      }
    }
  }
};
/* eslint-enable */

module.exports = fileName => dest => (result) => {
  const target = dest.includes('input') ? result : result.response.outputs.output;

  if (Object.keys(target).length) {
    try {
      const contract = stringify(_.entries(omitEmpty(target)).map(entry => buildContract(entry, !_.isObject(entry[1]))));
      fs.writeFileSync(
        `${path.resolve(`./${dest}`, fileName)}.${dest}.js`,
        `/* eslint-disable */\nmodule.exports = ${contract};\n`,
        null,
        2
      );
      console.log('Contract built.');
    } catch (err) {
      throw err;
    }
  } else {
    console.log('Contract was not updated.');
  }
};
