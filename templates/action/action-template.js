import { getResponse as makeBizagiResponse, error as makeBizagiErrorMessage } from 'bz-util';

/**
 * @author: ________
 */
export function fn(deps, globals, actionName, data, authenticationType, logger, done) {
  const { authdata } = globals;
  const { inputs: { input } } = data;

  const bzResponse = makeBizagiResponse({}, null, 200, null);
  logger.info(printPretty(JSON.stringify(bzResponse, null, 2)));
  done(bzResponse);

  /**
   * Or in case it fails with an error, err:
   * const errorMessage = makeBizagiErrorMessage('GLB.EXCEPTION', [ err, err.status, 'Error Location.' ]);
     const bzError = makeBizagiResponse(null, err, err.status, errorMessage);
     logger.error(JSON.stringify(bzError, null, 2));
     done(bzError);
   */
}

// Bind arguments so there are no global variables.
export const invoke = fn.bind(null, {});
