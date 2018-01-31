import { createReadStream, createWriteStream } from 'fs';
import { resolve } from 'path';
import { sync } from 'mkpath';
import { kebabCase } from 'lodash';
import chalk from 'chalk';
import normalize from 'normalize-path';

const ACTION_TEMPLATE_PATH = resolve(__dirname, '../../../templates/action/action-template.js');

export default function writeActionFile(actionName) {
  sync('src', 0o0777);

  const destPath = `src/${kebabCase(actionName)}.js`;
  const actionWS = createWriteStream(resolve(destPath));

  const onFinish = () => {
    actionWS.end();
    console.log(`${chalk.green('create')} ${chalk.gray(normalize(destPath))}`);
  };

  actionWS.on('finish', onFinish);
  createReadStream(ACTION_TEMPLATE_PATH).pipe(actionWS);
}
