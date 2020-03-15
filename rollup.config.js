import pkg from './package.json';
import buble from '@rollup/plugin-buble';
import builtins from 'rollup-plugin-node-builtins';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import css from 'rollup-plugin-css-only';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';

const globals = {
  react: 'React',
  'prop-types': 'PropTypes',
  recompose: 'recompose',
  difflib: 'difflib',
  util: 'util'
};

const baseConfig = {
  input: 'src/index.js',
  external: ['react', 'prop-types', 'recompose', 'difflib'],
  plugins: [
    buble({
      exclude: 'node_modules/**',
      objectAssign: true
    }),
    builtins(),
    nodeResolve({ jsnext: true }),
    commonjs({ include: 'node_modules/**' }),
    css({ output: 'dist/css/diff2html.min.css' }),
    sizeSnapshot()
  ]
};

export default [
  {
    ...baseConfig,
    output: { file: pkg.main, format: 'cjs' }
  },
  {
    ...baseConfig,
    output: { file: pkg.module, format: 'es' }
  },
  {
    ...baseConfig,
    output: { file: pkg.umd, name: 'ReactGhLikeDiff', format: 'umd', globals }
  }
];
