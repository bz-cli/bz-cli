#!/usr/bin/env node
import program from 'commander';
import { generateProject, generateAction, generateService, generateRepository, generateHttpModule } from './tasks';

program
  .version('0.0.1')
  .description('Develop custom connectors for Bizagi Studio blazingly fast.');

program
  .command('new <appName>')
  .description('Create a new project.')
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
