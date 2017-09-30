// Ref: https://github.com/rtfpessoa/diff2html/blob/master/website/templates/pages/demo/demo.js

export const githubPrUrl = /^https?:\/\/(?:www\.)?github\.com\/(.*?)\/(.*?)\/pull\/(.*?)(?:\.diff)?(?:\.patch)?(?:\/.*)?$/;
export const githubCommitUrl = /^https?:\/\/(?:www\.)?github\.com\/(.*?)\/(.*?)\/commit\/(.*?)(?:\.diff)?(?:\.patch)?(?:\/.*)?$/;

export const githubUrlRegex = (fn, url) => fn.exec(url);
