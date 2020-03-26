import utils, { defaultOptions } from '../utils';

it('should convert input string into compared html', () => {
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
