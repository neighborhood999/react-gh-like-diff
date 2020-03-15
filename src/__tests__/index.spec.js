import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { readFileSync } from 'fs';
import { ReactGhLikeDiff, RenderDiffResult } from '../index';

test('should render innerHTML by dangerouslySetInnerHTML', () => {
  const html = '<h1>Hello World</h1>';
  const wrapper = mount(<RenderDiffResult genDiffHTML={html} />);

  expect(
    wrapper
      .render()
      .find('h1')
      .text()
  ).toBe('Hello World');
});

test('should render `past` and `current` difference comparison result into HTML', () => {
  const past = '## Hello';
  const current = '# Hello World';
  const options = {
    originalFileName: 'test.md',
    updatedFileName: 'test.md'
  };

  const wrapper = mount(
    <ReactGhLikeDiff past={past} current={current} options={options} />
  );

  expect(wrapper.name()).toBe(
    'defaultProps(onlyUpdateForPropTypes(branch(RenderDiffResult)))'
  );

  const tree = renderer
    .create(<ReactGhLikeDiff past={past} current={current} options={options} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test('should render `.diff` file content to HTML', () => {
  const fileContent = readFileSync('./src/__tests__/mock.diff', 'utf8');
  const wrapper = mount(<ReactGhLikeDiff diffString={fileContent} />);

  expect(wrapper.name()).toBe(
    'defaultProps(onlyUpdateForPropTypes(branch(RenderDiffResult)))'
  );

  const tree = renderer
    .create(<ReactGhLikeDiff diffString={fileContent} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
