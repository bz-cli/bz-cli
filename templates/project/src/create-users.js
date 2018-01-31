import { getResponse as makeBizagiResponse, error as makeBizagiErrorMessage } from 'bz-util';

// Fake Friends API.
const friendsAPI = {
  addFriends: (authdata, friends) =>
    new Promise((resolve, reject) => setTimeout(() => resolve([ '1', '2', '3' ]), 1500))
};

/**
 * @author: John Doe
 */
export function createUsers(deps, globals, actionName, data, authenticationType, logger, done) {
  const { authdata } = globals;
  const { inputs: { input } } = data;

  const { usersInfo } = input;
  const { friendsAPI } = deps;

  friendsAPI
    .addFriends(authdata, usersInfo)
    .then((usersId) => {
      const bzResponse = makeBizagiResponse({ usersId }, null, 200, null);
      logger.info(JSON.stringify(bzResponse, null, 2));
      done(bzResponse);
    })
    .catch((err) => {
      const errorMessage = makeBizagiErrorMessage('GLB.EXCEPTION', [ err, err.status, 'Friends API.' ]);
      const bzError = makeBizagiResponse(null, err, err.status, errorMessage);
      logger.error(JSON.stringify(bzError, null, 2));
      done(bzError);
    });
}

// Bind arguments so there are no global variables.
export const invoke = createUsers.bind(null, {
  friendsAPI
});
