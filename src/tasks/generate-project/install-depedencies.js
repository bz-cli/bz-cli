import { spawn } from 'child_process';
import normalize from 'normalize-path';
import chalk from 'chalk';

const INSTALL_ARGS = ['install'];
const INSTALL_OPTIONS = {
  stdio: 'inherit',
  shell: true,
};

export default function installDependencies(appName, useYarn) {
  const packageManager = useYarn ? 'yarn' : 'npm';
  const installCommand = `cd ${normalize(`${process.cwd()}/${appName}`)} && ${packageManager}`;

  console.log(chalk.green(`Installing packages for tooling via ${packageManager}`));

  return new Promise((resolve, reject) =>
    spawn(installCommand, INSTALL_ARGS, INSTALL_OPTIONS).on('close', (code) => {
      if (code === 0) {
        console.log(chalk.green(`Installed packages for tooling via ${packageManager}.`));
        resolve();
      } else {
        const message = 'Package install failed, see above.';
        console.log(chalk.red(message));
        reject(message);
      }
    }));
}
