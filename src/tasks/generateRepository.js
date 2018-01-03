import { createReadStream, createWriteStream } from 'fs';
import { resolve } from 'path';
import { sync } from 'mkpath';
import { kebabCase } from 'lodash';
import chalk from 'chalk';

const REPOSITORY_TEMPLATE_PATH = resolve(__dirname, '../../templates/repository/repository-template.js');

const getDestPath = (repositoryName) => `src/${kebabCase(repositoryName)}.repository.js`;

export const generateRepository = (repositoryName) => {
  console.warn(repositoryName);
  const destPath = getDestPath(repositoryName);

	sync('src', parseInt(`0777`, 8));

  const ws = createWriteStream(resolve(destPath));
  ws.on('finish', () => {
    ws.end();
    console.log(`${chalk.greenBright('create')} ${chalk.gray(destPath)}`);
  });

  createReadStream(REPOSITORY_TEMPLATE_PATH).pipe(ws);
};
