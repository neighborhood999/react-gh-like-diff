import React from 'react';
import { render } from '@testing-library/react';
import { readFileSync } from 'fs';
import { ReactGhLikeDiff, RenderDiffResult } from '../index';

it('should match snapshot', () => {
  const past = '## Hello';
  const current = '# Hello World';
  const options = {
    originalFileName: 'test.md',
    updatedFileName: 'test.md'
  };

  const container = render(
    <ReactGhLikeDiff past={past} current={current} options={options} />
  );

  expect(container).toMatchSnapshot();
});

it('should render innerHTML by dangerouslySetInnerHTML', () => {
  const html = '<h1>Hello World</h1>';
  const container = render(<RenderDiffResult genDiffHTML={html} />);

  expect(container.queryByText('Hello World')).toBeInTheDocument();
});

it('should render `.diff` file content to HTML', () => {
  const fileContent = readFileSync('./src/__tests__/mock.diff', 'utf8');
  const container = render(<ReactGhLikeDiff diffString={fileContent} />);

  expect(container).toMatchSnapshot();
});
