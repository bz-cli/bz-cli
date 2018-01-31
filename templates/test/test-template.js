const { Globals, Data } = require('./common');
const { invoke } = require('../build/actions/...');
const makeMap = require('../map-contract');

const ACTION_NAME = '';

const globals = Globals({
  host: 'http://localhost',
  port: 2376
});

const data = Data({});

const map = makeMap(ACTION_NAME);

// Creates the file with the inputs.
map('inputs')(data.inputs.input);

// Creates function that logs the file with the outputs.
const done = map('outputs');

// Executes the action and pipes the result to the output builder function.
invoke(globals, ACTION_NAME, data, 'custom', console, done);
