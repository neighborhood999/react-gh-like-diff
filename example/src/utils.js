// Ref: https://github.com/rtfpessoa/diff2html/blob/master/website/templates/pages/demo/demo.js

const githubPrUrl = /^https?:\/\/(?:www\.)?github\.com\/(.*?)\/(.*?)\/pull\/(.*?)(?:\.diff)?(?:\.patch)?(?:\/.*)?$/;

export const githubPrUrlGen = url => githubPrUrl.exec(url);
