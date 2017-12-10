var bizagiUtil = require('bz-util');
var log = bizagiUtil.isLoggerEnabled;
var RESPONSE = bizagiUtil.getResponse;

function invoke(globals, LOG, callback) {
	var authData = globals.authdata;
	var systemProperties = globals.systemproperties;
	var projectName = globals.projectname;

	LOG.debug([ '[template.auth] projectName: ', projectName, ' globals: ', globals ]);

	var reply = RESPONSE({}, null, 200);
	callback(reply);
}

exports.invoke = invoke;
