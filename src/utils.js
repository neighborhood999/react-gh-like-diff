import { unifiedDiff } from 'difflib';
import { format } from 'util';
import { compose } from 'recompose';

const { Diff2Html: { getPrettyHtml } } = require('diff2html');

export const defaultOptions = {
  originalFileName: 'Unknown-File-Name',
  updatedFileName: 'Unknown-File-Name',
  inputFormat: 'diff',
  outputFormat: 'side-by-side',
  showFiles: false,
  matching: 'none',
  matchWordsThreshold: 0.25,
  matchingMaxComparisons: 2500
};

const withErrorMessage = props => {
  const { past, current } = props;

  if (past === undefined || current === undefined) {
    const errorMessage = 'Missing `past` or `current` props!';
    throw errorMessage;
  }

  return props;
};

const compare = ({ past, current, options }) => {
  const pastArray = past.split(/\r|\n|\r\n/);
  const currentArray = current.split(/\r|\n|\r\n/);

  const diffArray = unifiedDiff(pastArray, currentArray, {
    fromFile: options.originalFileName,
    toFile: options.updatedFileName
  });

  const diffString = format(
    'diff --git %s %s\n%s',
    options.originalFileName,
    options.updatedFileName,
    diffArray.join('\n')
  );

  return {
    diffString,
    options
  };
};

export const genPrettyHtml = ({ diffString, options }) => {
  const nextOptions = Object.assign({}, defaultOptions, options);

  return getPrettyHtml(diffString, nextOptions);
};

export default compose(genPrettyHtml, compare, withErrorMessage);
