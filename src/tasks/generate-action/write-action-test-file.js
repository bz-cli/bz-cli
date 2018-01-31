import { createReadStream, createWriteStream } from 'fs';
import { resolve } from 'path';
import { sync } from 'mkpath';
import { kebabCase } from 'lodash';
import chalk from 'chalk';
import normalize from 'normalize-path';

const ACTION_TEST_TEMPLATE_PATH = resolve(__dirname, '../../../templates/test/test-template.js');

export default function writeTestFile(actionName) {
  sync('__tests__', 0o0777);

  const testDestPath = `__tests__/${kebabCase(actionName)}.test.js`;
  const testWS = createWriteStream(resolve(testDestPath));

  const onFinish = () => {
    testWS.end();
    console.log(`${chalk.green('create')} ${chalk.gray(normalize(testDestPath))}`);
  };

  testWS.on('finish', () => onFinish);
  createReadStream(ACTION_TEST_TEMPLATE_PATH).pipe(testWS);
}
