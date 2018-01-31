/**
 * Taken from @angular-cli (with some modifications)
 */
import { oneLine, stripIndent } from 'common-tags';
import SilentError from 'silent-error';

const projectNameRegexp = /^[a-zA-Z][.0-9a-zA-Z]*(-[.0-9a-zA-Z]*)*$/;

function getRegExpFailPosition(str) {
  const parts = str.split('-');
  const matched = [];

  parts.forEach((part) => {
    if (part.match(projectNameRegexp)) {
      matched.push(part);
    }
  });

  const compare = matched.join('-');
  return (str !== compare) ? compare.length : null;
}

export function validateProjectName(projectName) {
  const errorIndex = getRegExpFailPosition(projectName);
  if (errorIndex !== null) {
    const firstMessage = oneLine`
      Project name "${projectName}" is not valid. New project names must
      start with a letter, and must contain only alphanumeric characters or dashes.
      When adding a dash the segment after the dash must also start with a letter.
    `;
    const msg = stripIndent`
      ${firstMessage}
      ${projectName}
      ${`${Array(errorIndex + 1).join(' ')}^`}
    `;
    throw new SilentError(msg);
  }
}
