import { createReadStream, createWriteStream } from 'fs';
import { resolve } from 'path';
import { sync } from 'mkpath';
import { kebabCase } from 'lodash';
import chalk from 'chalk';

const ACTION_TEMPLATE_PATH = resolve(__dirname, '../../templates/action/action-template.js');
const TEMPLATE_RELATIVE_PATH = resolve('../../templates/action/action-template.js');

const getDestPath = (actionName) => `test/${kebabCase(actionName)}.js`;

export const generateAction = (actionName) => {
  const destPath = getDestPath(actionName);

	sync('src', parseInt(`0777`, 8));

  const ws = createWriteStream(resolve(destPath));
  ws.on('finish', () => {
    ws.end();
    console.log(`${chalk.greenBright('create')} ${chalk.gray(destPath)}`);
  });

  createReadStream(ACTION_TEMPLATE_PATH).pipe(ws);
};
