import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import ReactGhLikeDiff, { RenderDiffResult } from '../index';
import { defaultOptions } from '../utils';

test('should render innerHTML by dangerouslySetInnerHTML', () => {
  const html = '<h1>Hello World</h1>';
  const wrapper = mount(<RenderDiffResult genDiffHTML={html} />);

  expect(wrapper.render().find('h1').text()).toBe('Hello World');
});

test('should render different result into HTML', () => {
  const past = 'Hello';
  const current = 'Hello World';
  const options = {
    originalFileName: 'test.txt',
    updatedFileName: 'test.txt'
  };

  const wrapper = mount(
    <ReactGhLikeDiff past={past} current={current} options={options} />
  );

  expect(wrapper.name()).toBe(
    'defaultProps(onlyUpdateForPropTypes(mapProps(Component)))'
  );

  const tree = renderer
    .create(<ReactGhLikeDiff past={past} current={current} options={options} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
