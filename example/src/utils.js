// Ref: https://github.com/rtfpessoa/diff2html/blob/master/website/templates/pages/demo/demo.js

import axios from 'axios';

export const githubPrUrl = /^https?:\/\/(?:www\.)?github\.com\/(.*?)\/(.*?)\/pull\/(.*?)(?:\.diff)?(?:\.patch)?(?:\/.*)?$/;
export const githubCommitUrl = /^https?:\/\/(?:www\.)?github\.com\/(.*?)\/(.*?)\/commit\/(.*?)(?:\.diff)?(?:\.patch)?(?:\/.*)?$/;

export const githubUrlRegex = (fn, url) => fn.exec(url);
export const fetchGithubAPI = ([, userName, repoName, value], type) => {
  const githubUrlGen = `https://api.github.com/repos/${userName}/${repoName}/${type}/${value}`;

  return axios.get(githubUrlGen, {
    headers: { Accept: 'application/vnd.github.v3.diff' }
  });
};
