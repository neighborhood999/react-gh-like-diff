import pkg from './package.json';
import babel from 'rollup-plugin-babel';
import builtins from 'rollup-plugin-node-builtins';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import css from 'rollup-plugin-css-porter';

const exportsOpt = 'named';
const globalsOpt = {
  react: 'React',
  'prop-types': 'PropTypes',
  recompose: 'recompose',
  difflib: 'difflib',
  util: 'util'
};

const config = {
  input: 'src/index.js',
  external: ['react', 'prop-types', 'recompose', 'difflib'],
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
    { file: pkg.main, format: 'cjs', exports: exportsOpt, globals: globalsOpt },
    {
      file: pkg.module,
      format: 'es',
      exports: exportsOpt,
      globals: globalsOpt
    },
    {
      file: pkg.umd,
      format: 'umd',
      name: 'react-gh-like-diff',
      exports: exportsOpt,
      globals: globalsOpt
    }
  ]
};

export default config;
