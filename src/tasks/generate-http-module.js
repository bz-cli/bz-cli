import { createReadStream, createWriteStream } from 'fs';
import { resolve } from 'path';
import { sync } from 'mkpath';
import chalk from 'chalk';
import normalize from 'normalize-path';

const HTTP_TEMPLATE_PATH = resolve(__dirname, '../../templates/http/http-template.js');

export function generateHttpModule() {
  const destPath = 'src/Http.js';

  sync('src', 0o0777);

  const ws = createWriteStream(resolve(destPath));

  const onFinish = () => {
    ws.end();
    console.log(`${chalk.green('create')} ${chalk.gray(normalize(destPath))}`);
  };

  ws.on('finish', onFinish);
  createReadStream(HTTP_TEMPLATE_PATH).pipe(ws);
}
