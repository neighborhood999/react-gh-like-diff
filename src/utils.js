import { unifiedDiff } from 'difflib';
import { format } from 'util';
import { compose } from 'recompose';

const {
  Diff2Html: { getPrettyHtml }
} = require('diff2html');

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

const compare = ({ past, current, options }) => {
  const updateOptions = { ...defaultOptions, ...options };
  const pastArray = past.split(/\r|\n|\r\n/);
  const currentArray = current.split(/\r|\n|\r\n/);

  const diffArray = unifiedDiff(pastArray, currentArray, {
    fromfile: updateOptions.originalFileName,
    tofile: updateOptions.updatedFileName
  });

  const diffString = format(
    'diff --git %s %s\n%s',
    updateOptions.originalFileName,
    updateOptions.updatedFileName,
    diffArray.join('\n')
  );

  return {
    diffString,
    options: updateOptions
  };
};

export const genPrettyHtml = ({ diffString, options }) =>
  getPrettyHtml(diffString, options);

export default compose(
  genPrettyHtml,
  compare
);
