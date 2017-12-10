/**
 * @author Carlos Camilo Lobo Ulloque
 */

var actions = require('./actions');
var bizagiUtil = require('bz-util');
var ERROR = bizagiUtil.error;
var path = require('path');
var LOGGER = bizagiUtil.LOG;
var config = bizagiUtil.config;
var RESPONSE = bizagiUtil.getResponse;

function invokeAction(globals, actionName, data, authenticationType, callback, enableLog) {
	try {
		if (actionName in actions) {
			var action = bizagiUtil.loadModule(path.join(__dirname, 'actions', actionName));

			var projectName = globals.projectname;

			var log = String(enableLog) === 'true';
			var LOG = LOGGER(projectName + '-' + config.logFileName, log);

			action.invoke(globals, actionName, data, authenticationType, LOG, callback);
		} else {
			var error = RESPONSE(null, null, -400, ERROR('GLB.UNKNOW_ACTION', [ actionName ]));
			callback(error);
		}
	} catch (e) {
		var error = RESPONSE(
			null,
			null,
			-400,
			ERROR('GLB.EXCEPTION', [ e.message, e, config.logFileName + '.bizagiRouter.invokeAction' ])
		);
		callback(error);
		LOG.error([ ERROR('GLB.EXCEPTION', [ e.message, e, config.logFileName + '.bizagiRouter.invokeAction' ]) ]);
	}
}

function authenticator(globals, callback, enableLog) {
	try {
		var auth = bizagiUtil.loadModule(path.join(__dirname, 'auth', 'auth'));

		var projectName = globals.projectname;

		var log = String(enableLog) === 'true';
		var LOG = LOGGER(projectName + '-' + config.logFileName, log);

		auth.invoke(globals, LOG, callback);
	} catch (e) {
		var error = RESPONSE(
			null,
			null,
			-400,
			ERROR('GLB.EXCEPTION', [ e.message, e, config.logFileName + '.bizagiRouter.authenticator' ])
		);
		callback(error);
		LOG.error([ ERROR('GLB.EXCEPTION', [ e.message, e, config.logFileName + '.bizagiRouter.invokeAction' ]) ]);
	}
}

function cleanAllModulesCache(globals, callback, enableLog) {
	try {
		var projectName = globals.projectname;
		var log = String(enableLog) === 'true';
		var LOG = LOGGER(projectName + '-' + config.logFileName, log);

		bizagiUtil.cleanAllModulesCache();
		var reply = RESPONSE({ cleaned: true }, null, 200);

		LOG.debug([ config.logFileName, ' cache clean success. Response: ', reply ]);
		callback(reply);
	} catch (e) {
		e.cleaned = false;
		var error = RESPONSE(
			null,
			null,
			-400,
			ERROR('GLB.EXCEPTION', [ e.message, e, config.logFileName + '.bizagiRouter.cleanAllModulesCache' ])
		);
		callback(error);
		LOG.error([
			ERROR('GLB.EXCEPTION', [ e.message, e, config.logFileName + '.bizagiRouter.cleanAllModulesCache' ])
		]);
	}
}

exports.invokeAction = invokeAction;
exports.authenticator = authenticator;
exports.cleanAllModulesCache = cleanAllModulesCache;
