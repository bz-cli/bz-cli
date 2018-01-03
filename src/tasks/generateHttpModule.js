import { createReadStream, createWriteStream } from 'fs';
import { resolve } from 'path';
import { sync } from 'mkpath';
import { kebabCase } from 'lodash';
import chalk from 'chalk';

const HTTP_TEMPLATE_PATH = resolve(__dirname, '../../templates/http/http-template.js');

export const generateHttpModule = (serviceName) => {

  const destPath = 'src/Http.js';

	sync('src', parseInt(`0777`, 8));

  const ws = createWriteStream(resolve(destPath));
  ws.on('finish', () => {
    ws.end();
    console.log(`${chalk.greenBright('create')} ${chalk.gray(destPath)}`);
  });

  createReadStream(HTTP_TEMPLATE_PATH).pipe(ws);
};
