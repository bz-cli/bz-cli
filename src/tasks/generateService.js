import { createReadStream, createWriteStream } from 'fs';
import { resolve } from 'path';
import { sync } from 'mkpath';
import { kebabCase } from 'lodash';
import chalk from 'chalk';

const SERVICE_TEMPLATE_PATH = resolve(__dirname, '../../templates/service/service-template.js');

const getDestPath = (serviceName) => `src/${kebabCase(serviceName)}.service.js`;

export const generateService = (serviceName) => {

  const destPath = getDestPath(serviceName);

	sync('src', parseInt(`0777`, 8));

  const ws = createWriteStream(resolve(destPath));
  ws.on('finish', () => {
    ws.end();
    console.log(`${chalk.greenBright('create')} ${chalk.gray(destPath)}`);
  });

  createReadStream(SERVICE_TEMPLATE_PATH).pipe(ws);
};
