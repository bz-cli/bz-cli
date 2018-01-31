import writeActionFile from './write-action-file';
import writeTestFile from './write-action-test-file';

export function generateAction(actionName) {
  writeActionFile(actionName);
  writeTestFile(actionName);
}
