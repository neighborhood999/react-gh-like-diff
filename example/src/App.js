import React from 'react';
import GithubLikeDiff from 'react-gh-like-diff';
import axios from 'axios';
import swal from 'sweetalert';
import { githubPrUrlGen } from './utils';

class App extends React.Component {
  state = {
    diffString: ''
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

      try {
        this.fetchGithubAPI(githubPrUrlGen(url), 'pulls');
      } catch (err) {
        swal('Oops!', 'Please Enter Pull Request URL.', 'error');
      }
    }

    return;
  };

  handleClick = e => {
    e.preventDefault();

    const url = this.textURL.value;
    try {
      this.fetchGithubAPI(githubPrUrlGen(url), 'pulls');
    } catch (err) {
      swal('Oops!', 'Please Enter Pull Request URL.', 'error');
    }
  };

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
