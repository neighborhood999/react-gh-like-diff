import React from 'react';
import PropTypes from 'prop-types';
import diffHelper, { defaultOptions, genPrettyHtml } from './utils';
import {
  branch,
  compose,
  defaultProps,
  mapProps,
  onlyUpdateForPropTypes,
  setPropTypes
} from 'recompose';
import 'diff2html/dist/diff2html.css';

export const RenderDiffResult = ({ genDiffHTML }) => (
  <div dangerouslySetInnerHTML={{ __html: genDiffHTML }} />
);

export const ReactGhLikeDiff = compose(
  defaultProps({
    diffString: '',
    past: '',
    current: '',
    options: defaultOptions
  }),
  onlyUpdateForPropTypes,
  setPropTypes({
    past: PropTypes.string,
    current: PropTypes.string,
    options: PropTypes.object,
    diffString: PropTypes.string
  }),
  branch(
    ({ diffString }) => diffString.length !== 0,
    () => props => <RenderDiffResult genDiffHTML={genPrettyHtml(props)} />,
    mapProps(props => ({
      genDiffHTML: diffHelper(props)
    }))
  )
)(RenderDiffResult);
