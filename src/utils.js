import { unifiedDiff } from 'difflib';
import { format } from 'util';
import { compose } from 'recompose';

export const defaultOptions = {
  originalFileName: 'Unknown-File-Name',
  updatedFileName: 'Unknown-File-Name',
  inputFormat: 'diff',
  outputFormat: 'side-by-side',
  showFiles: false,
  matching: 'none',
  matchWordsThreshold: 0.25,
  matchingMaxComparisons: 2500,
  maxLineSizeInBlockForComparison: 200,
  maxLineLengthHighlight: 10000,
  renderNothingWhenEmpty: false
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
  require('diff2html').html(diffString, options);

export default compose(genPrettyHtml, compare);
