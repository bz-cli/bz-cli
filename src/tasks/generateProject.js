import ncp from 'ncp';
import { resolve } from 'path';
import { sync } from 'mkpath';
import chalk from 'chalk';
import { exec } from 'child_process';
import animate from 'chalk-animation';
import npm from 'npm-programmatic';

const PROJECT_TEMPLATE_PATH = resolve(__dirname, '../../templates/project');
let INSTALL_DEPS_MESSAGE = 'Installing dependencies';
const INSTALL_DEPS_ANIMATION = animate.glitch(`${chalk.yellowBright(INSTALL_DEPS_MESSAGE)}`, 0.3);

const DEPS = [ 'babel-plugin-transform-runtime', 'babel-polyfill', 'babel-runtime', 'bz-util', 'regenerator-runtime' ];
const DEV_DEPS = [
	'babel-cli',
	'babel-core',
	'babel-plugin-transform-object-rest-spread',
	'babel-preset-es2015',
	'babel-preset-stage-3',
  'bz-define',
  'bz-zip',
	'cpr',
	'rimraf'
];

const npmInstall = (projectPath, animationInterval) =>
	Promise.all([
		npm.install(DEPS, { cwd: projectPath, save: true }),
		npm.install(DEV_DEPS, { cwd: projectPath, saveDev: true })
	])
		.then(() => {
			INSTALL_DEPS_ANIMATION.stop();
			clearInterval(animationInterval);
			console.log(`${chalk.greenBright(`Your project is ready! Happy coding <3`)}`);
		})
		.catch((err) => {
			throw err;
		});

const addDots = () =>
	setInterval(() => {
		INSTALL_DEPS_ANIMATION.replace((INSTALL_DEPS_MESSAGE += '.'));
	}, 300);

export const generateProject = (appName) => {
	const PROJECT_PATH = `${process.cwd()}/${appName}`;

	sync(appName, parseInt(`0777`, 8));

	ncp(PROJECT_TEMPLATE_PATH, appName, (err) => {
		if (err) throw err;

		console.log(`${chalk.greenBright('create')} ${chalk.gray(PROJECT_PATH)}`);
		console.log(`${chalk.gray('Please wait a while. ')}`);
		INSTALL_DEPS_ANIMATION.start();

		npmInstall(PROJECT_PATH, addDots());
	});
};
