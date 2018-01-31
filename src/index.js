#!/usr/bin/env node
import program from 'commander';

import module from '../package.json';
import { generateProject, generateAction, generateService, generateRepository, generateHttpModule } from './tasks';

program
  .version(module.version)
  .description('Develop custom connectors for Bizagi Studio blazingly fast.');

program
  .command('new <appName>')
  .description('Create a new project.')
  .option('--yarn', 'Install using yarn package manager.')
  .action(generateProject);

program
  .command('generate-action <actionName>')
  .description('Generate a new custom connector action.')
  .action(generateAction);

program
  .command('generate-repository <repositoryName>')
  .description('Generate a new repository class.')
  .action(generateRepository);

program
  .command('generate-service <serviceName>')
  .description('Generate a new service class.')
  .action(generateService);

program
  .command('generate-http')
  .description('Generate a new Http module.')
  .action(generateHttpModule);

program.parse(process.argv);
