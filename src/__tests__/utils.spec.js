import utils, { defaultOptions } from '../utils';

test('should convert input string into compared html', () => {
  const past = 'Hello World';
  const current = 'Hellow Hellow';
  const props = {
    past,
    current,
    options: defaultOptions
  };
  const tree = utils(props);

  expect(tree).toMatchSnapshot();
});

test('shound throw error message when missing necessary props', () => {
  const past = undefined;
  const current = undefined;
  const props = {
    past,
    current,
    options: defaultOptions
  };

  expect(() => utils(props)).toThrowError('Missing `past` or `current` props!');
});
