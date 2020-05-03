import pkg from './package.json';
import buble from '@rollup/plugin-buble';
import builtins from 'rollup-plugin-node-builtins';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import css from 'rollup-plugin-css-only';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';

const globals = {
  react: 'React',
  'prop-types': 'PropTypes',
  recompose: 'recompose',
  difflib: 'difflib',
  util: 'util'
};

const env = process.env.NODE_ENV;

const baseConfig = {
  input: 'src/index.js',
  external: ['react', 'prop-types', 'recompose', 'difflib'],
  plugins: [
    replace({ 'process.env.NODE_ENV': JSON.stringify(env) }),
    builtins(),
    nodeResolve({ jsnext: true }),
    commonjs({ include: 'node_modules/**' }),
    buble({
      exclude: 'node_modules/**',
      objectAssign: true
    }),
    css({ output: 'dist/css/diff2html.min.css' })
  ]
};

if (env === 'production') {
  baseConfig.plugins.push(terser());
  baseConfig.plugins.push(sizeSnapshot());
}

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
