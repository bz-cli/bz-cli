'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.invoke = undefined;
exports.createUsers = createUsers;

var _bzUtil = require('bz-util');

// Fake Friends API.
var friendsAPI = {
  addFriends: function addFriends(authdata, friends) {
    return new Promise(function (resolve, reject) {
      return setTimeout(function () {
        return resolve(['1', '2', '3']);
      }, 1500);
    });
  }
};

/**
 * @author: John Doe
 */
function createUsers(deps, globals, actionName, data, authenticationType, logger, done) {
  var authdata = globals.authdata;
  var input = data.inputs.input;
  var usersInfo = input.usersInfo;
  var friendsAPI = deps.friendsAPI;


  friendsAPI.addFriends(authdata, usersInfo).then(function (usersId) {
    var bzResponse = (0, _bzUtil.getResponse)({ usersId: usersId }, null, res.status, null);
    logger.info(printPretty(JSON.stringify(bzResponse, null, 2)));
    done(bzResponse);
  }).catch(function (err) {
    var errorMessage = (0, _bzUtil.error)('GLB.EXCEPTION', [err, err.status, 'Friends API.']);
    var bzError = (0, _bzUtil.getResponse)(null, err, err.status, errorMessage);
    logger.error(JSON.stringify(bzError, null, 2));
    done(bzError);
  });
}

// Bind arguments so there are no global variables.
var invoke = exports.invoke = createUsers.bind(null, {
  friendsAPI: friendsAPI
});