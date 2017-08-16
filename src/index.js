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

const renderDiffResult = ({ genDiffHTML }) =>
  <div dangerouslySetInnerHTML={{ __html: genDiffHTML }} />;

export default compose(
  defaultProps({ options: defaultOptions }),
  onlyUpdateForPropTypes,
  setPropTypes({
    past: PropTypes.any.isRequired,
    current: PropTypes.any.isRequired
  }),
  mapProps(props => ({
    genDiffHTML: diffHelper(props)
  }))
)(renderDiffResult);
