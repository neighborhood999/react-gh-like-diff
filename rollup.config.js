import pkg from './package.json';
import babel from 'rollup-plugin-babel';
import builtins from 'rollup-plugin-node-builtins';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import css from 'rollup-plugin-css-porter';

const config = {
  input: 'src/index.js',
  external: ['react', 'prop-types', 'recompose', 'difflib'],
  globals: {
    react: 'React',
    'prop-types': 'PropTypes',
    recompose: 'recompose',
    difflib: 'difflib',
    util: 'util'
  },
  exports: 'named',
  plugins: [
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers']
    }),
    builtins(),
    nodeResolve({
      jsnext: true
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    css({ dest: 'lib/diff2html.css' })
  ],
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' },
    {
      file: pkg.umd,
      format: 'umd',
      name: 'react-gh-like-diff'
    }
  ]
};

export default config;
