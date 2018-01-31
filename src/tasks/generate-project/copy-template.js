import { resolve as resolvePath } from 'path';
import copy from 'ncp';
import normalize from 'normalize-path';
import chalk from 'chalk';

const PROJECT_TEMPLATE_PATH = resolvePath(__dirname, '../../../templates/project');

export default function copyTemplate(appName) {
  return new Promise((resolve, reject) =>
    copy(PROJECT_TEMPLATE_PATH, appName, (err) => {
      if (err) {
        reject(err);
      } else {
        const PROJECT_PATH = normalize(`${process.cwd()}/${appName}`);
        console.log(`${chalk.green('create')} ${chalk.gray(PROJECT_PATH)}`);
        resolve();
      }
    }));
}
