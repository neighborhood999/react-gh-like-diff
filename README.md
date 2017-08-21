# react-gh-like-diff

[![npm](https://img.shields.io/npm/v/react-gh-like-diff.svg?style=flat-square)](https://www.npmjs.com/package/react-gh-like-diff)
[![Build Status](https://img.shields.io/travis/neighborhood999/react-gh-like-diff.svg?style=flat-square)](https://travis-ci.org/neighborhood999/react-gh-like-diff)
[![codecov](https://img.shields.io/codecov/c/github/neighborhood999/react-gh-like-diff.svg?style=flat-square)](https://codecov.io/gh/neighborhood999/react-gh-like-diff)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![](https://img.shields.io/badge/gzip-2.96KB-brightgreen.svg?style=flat-square)
![](https://img.shields.io/badge/module%20formats-cjs%2C%20esm%2C%20umd-green.svg?style=flat-square)

![react-gh-like-diff](./screenshot/diff-demo.png)

> Generate Github like difference comparison based on [diff2html](https://github.com/rtfpessoa/diff2html).

You can comparison difference string and generates pretty HTML based on [diff2html](https://github.com/rtfpessoa/diff2html).

## Installation

```sh
yarn add react-gh-like-diff

# or

npm install react-gh-like-diff
```

## Configuration

You can setting diff2html extra options, please reference [here](https://github.com/rtfpessoa/diff2html#configuration) :mag_right:.

## Props

#### past: string
	Required type for passing old string for comparison.

#### current: string
	Required type for passing new string for comparison.

#### ?options: Object
	diff2html extra configuration.

## Inspiration

[nakajmg - gh-diff-html](https://github.com/nakajmg/gh-diff-html)

## LICENSE

MIT © [Peng Jie](https://github.com/neighborhood999)
