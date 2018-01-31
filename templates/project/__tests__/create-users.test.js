const { Globals, Data } = require('./common');
const { invoke } = require('../build/actions/create-users');
const makeMap = require('../map-contract');

const ACTION_NAME = 'create-users';

const globals = Globals({
  host: 'http://localhost',
  port: 2376
});

const data = Data({
  userInfo: [
    {
      name: 'Mary',
      age: 18
    },
    {
      name: 'Susy',
      age: 23
    }
  ]
});

const map = makeMap(ACTION_NAME);

// Creates the file with the inputs.
map('inputs')(data.inputs.input);

// Creates function that logs the file with the outputs.
const done = map('outputs');

// Executes the action and pipes the result to the output builder function.
invoke(globals, ACTION_NAME, data, 'custom', console, done);
