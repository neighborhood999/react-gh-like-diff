import pkg from './package.json';
import babel from 'rollup-plugin-babel';
import builtins from 'rollup-plugin-node-builtins';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import css from 'rollup-plugin-css-porter';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';

const babelOptions = useESMoudles => ({
  exclude: 'node/modules/**',
  runtimeHelpers: true,
  plugins: [['@babel/plugin-transform-runtime', { useESMoudles }]]
});

const baseConfig = {
  input: 'src/index.js',
  external: ['react', 'prop-types', 'recompose', 'difflib'],
  plugins: [
    builtins(),
    nodeResolve({ jsnext: true }),
    commonjs({ include: 'node_modules/**' }),
    css({ dest: 'lib/diff2html.css' }),
    sizeSnapshot()
  ]
};

export default [
  {
    ...baseConfig,
    output: { file: pkg.main, format: 'cjs' },
    plugins: [
      babel(babelOptions({ useESModules: false })),
      ...baseConfig.plugins
    ]
  },
  {
    ...baseConfig,
    output: { file: pkg.module, format: 'es' },
    plugins: [
      babel(babelOptions({ useESModules: true })),
      ...baseConfig.plugins
    ]
  }
];
