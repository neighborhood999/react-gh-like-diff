# react-gh-like-diff

[![npm](https://img.shields.io/npm/v/react-gh-like-diff.svg?style=flat-square)](https://www.npmjs.com/package/react-gh-like-diff)
[![Build Status](https://img.shields.io/travis/neighborhood999/react-gh-like-diff.svg?style=flat-square)](https://travis-ci.org/neighborhood999/react-gh-like-diff)
[![Code Climate](https://img.shields.io/codeclimate/github/kabisaict/flow.svg?style=flat-square)](https://codeclimate.com/github/neighborhood999/react-gh-like-diff)
[![codecov](https://img.shields.io/codecov/c/github/neighborhood999/react-gh-like-diff.svg?style=flat-square)](https://codecov.io/gh/neighborhood999/react-gh-like-diff)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![](https://img.shields.io/badge/gzip-3%20kB-brightgreen.svg?style=flat-square)
![](https://img.shields.io/badge/module%20formats-cjs%2C%20esm%2C%20umd-green.svg?style=flat-square)

![react-gh-like-diff](./screenshot/diff-demo.png)

> Generate Github like comparison based on [diff2html](https://github.com/rtfpessoa/diff2html).

You can compare string or given [unified diff](http://www.gnu.org/software/diffutils/manual/html_node/Example-Unified.html#Example-Unified) to generate pretty HTML.

## Demo

[CodeSandbox](https://01mj5j2qv0.codesandbox.io/)

## Installation

```sh
yarn add react-gh-like-diff

# or

npm install react-gh-like-diff --save
```

## Configuration

You can set diff2html **extra options**, reference is [here](https://github.com/rtfpessoa/diff2html#configuration) :mag_right:.

## Props

### past

> `string` | defaults to `''`

Passing past string as `past` prop with `current` prop for comparison.

### current

> `string` | defaults to `''`

Passing current string as `current` prop with `past` prop for comparison.

### diffString

> `string` | defaults to `''`

Passing unified diff as prop to generate pretty HTML.

### options

> `object` | optional, See [here](https://github.com/neighborhood999/react-gh-like-diff/blob/master/src/utils.js#L7)

Reference diff2html docs for [extra configuration](https://github.com/rtfpessoa/diff2html#configuration) setting.

## Inspiration

[nakajmg - gh-diff-html](https://github.com/nakajmg/gh-diff-html)

## LICENSE

MIT © [Peng Jie](https://github.com/neighborhood999)
