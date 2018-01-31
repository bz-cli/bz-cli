import chalk from 'chalk';
import { sync } from 'mkpath';

import { validateProjectName } from '../utilities/validate-project-name';
import installDependencies from './install-depedencies';
import copyTemplate from './copy-template';

function handleError({ message }) {
  const sysMessage = 'Project creation failed. See bellow:';
  console.log(chalk.red(`${sysMessage}\n${message}`));
}

export function generateProject(appName, command) {
  try {
    validateProjectName(appName);

    sync(appName, 0o0777);

    copyTemplate(appName)
      .then(() => {
        console.log(`${chalk.gray('Please wait a while. ')}`);

        installDependencies(appName, command.yarn)
          .then(() => {
            console.log(`${chalk.magenta('Your project is ready! Happy coding <3')}`);
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        handleError(err);
        throw err;
      });
  } catch (err) {
    handleError(err);
  }
}
