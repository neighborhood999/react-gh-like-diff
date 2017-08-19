import React from 'react';
import PropTypes from 'prop-types';
import diffHelper, { defaultOptions } from './utils';
import {
  compose,
  defaultProps,
  mapProps,
  onlyUpdateForPropTypes,
  setPropTypes
} from 'recompose';
import 'diff2html/dist/diff2html.css';

export const RenderDiffResult = ({ genDiffHTML }) =>
  <div dangerouslySetInnerHTML={{ __html: genDiffHTML }} />;

export default compose(
  defaultProps({ options: defaultOptions }),
  onlyUpdateForPropTypes,
  setPropTypes({
    past: PropTypes.string.isRequired,
    current: PropTypes.string.isRequired
  }),
  mapProps(props => ({
    genDiffHTML: diffHelper(props)
  }))
)(RenderDiffResult);
