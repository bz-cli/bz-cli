import { createReadStream, createWriteStream } from 'fs';
import { resolve } from 'path';
import { sync } from 'mkpath';
import { kebabCase } from 'lodash';
import chalk from 'chalk';
import normalize from 'normalize-path';

const SERVICE_TEMPLATE_PATH = resolve(__dirname, '../../templates/service/service-template.js');

export function generateService(serviceName) {
  const destPath = `src/${kebabCase(serviceName)}.service.js`;

  sync('src', 0o0777);

  const ws = createWriteStream(resolve(destPath));

  const onFinish = () => {
    ws.end();
    console.log(`${chalk.green('create')} ${chalk.gray(normalize(destPath))}`);
  };

  ws.on('finish', onFinish);
  createReadStream(SERVICE_TEMPLATE_PATH).pipe(ws);
}
