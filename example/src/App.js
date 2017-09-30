import React from 'react';
import GithubLikeDiff from 'react-gh-like-diff';
import axios from 'axios';
import swal from 'sweetalert';
import { githubPrUrl, githubCommitUrl, githubUrlRegex } from './utils';

class App extends React.Component {
  state = {
    diffString: '',
    type: 'pulls',
    regexFn: {
      pulls: githubPrUrl,
      commits: githubCommitUrl
    }
  };

  fetchGithubAPI = async ([, userName, repoName, value], type) => {
    const githubUrlGen = `https://api.github.com/repos/${userName}/${repoName}/${type}/${value}`;

    try {
      const { data } = await axios.get(githubUrlGen, {
        headers: { Accept: 'application/vnd.github.v3.diff' }
      });

      this.setState((prevStates, props) => ({ diffString: data }));
    } catch (err) {
      swal('Oops!', `Seems like we couldn't fetch the info`, 'error');
    }
  };

  handleInput = event => {
    if (event.keyCode === 13) {
      const url = event.target.value;
      const type = this.state.type;

      try {
        this.fetchGithubAPI(
          githubUrlRegex(this.state.regexFn[type], url),
          type
        );
      } catch (err) {
        swal('Oops!', 'Check your url and select correct type.', 'error');
      }
    }

    return;
  };

  handleClick = e => {
    e.preventDefault();

    const type = this.state.type;
    const url = this.textURL.value;

    try {
      this.fetchGithubAPI(githubUrlRegex(this.state.regexFn[type], url), type);
    } catch (err) {
      swal('Oops!', 'Check your url and select correct type.', 'error');
    }
  };

  handleChange = e => this.setState({ type: e.target.value });

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="page-header">
              <h3>Fetching Github Repository Pull Request Comparison</h3>
            </div>
          </div>
          <div className="col-md-12">
            <blockquote>
              <p>Example Pull Request & Commit URL</p>
              <ul>
                <li>
                  <code>
                    https://github.com/neighborhood999/react-gh-like-diff/pull/23
                  </code>
                </li>
                <li>
                  <code>
                    https://github.com/neighborhood999/react-gh-like-diff/commit/be869e64071ef665c1bb8daee935a00120075d24
                  </code>
                </li>
              </ul>
            </blockquote>
          </div>
          <div className="col-md-2">
            <select
              className="form-control"
              value={this.state.type}
              onChange={this.handleChange}
            >
              <option value="pulls">PR</option>
              <option value="commits">Commit</option>
            </select>
          </div>
          <div className="col-md-10">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                onKeyDown={this.handleInput}
                ref={url => {
                  this.textURL = url;
                }}
              />
              <span className="input-group-btn">
                <button
                  className="btn btn-default"
                  type="button"
                  onClick={this.handleClick}
                >
                  Load
                </button>;
              </span>
            </div>
            <hr />
          </div>
          <div className="col-md-12">
            <GithubLikeDiff diffString={this.state.diffString} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
