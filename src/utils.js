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
  const nextOptions = { ...defaultOptions, ...options };
  const pastArray = past.split(/\r|\n|\r\n/);
  const currentArray = current.split(/\r|\n|\r\n/);

  const diffArray = unifiedDiff(pastArray, currentArray, {
    fromfile: nextOptions.originalFileName,
    tofile: nextOptions.updatedFileName
  });

  const diffString = format(
    'diff --git %s %s\n%s',
    nextOptions.originalFileName,
    nextOptions.updatedFileName,
    diffArray.join('\n')
  );

  return {
    diffString,
    options: nextOptions
  };
};

export const genPrettyHtml = ({ diffString, options }) =>
  getPrettyHtml(diffString, options);

export default compose(
  genPrettyHtml,
  compare
);
