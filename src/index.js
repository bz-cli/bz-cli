#!/usr/bin/env node
import program from 'commander';
import { generateProject, generateAction, generateRepository } from './tasks';

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

program.parse(process.argv);
