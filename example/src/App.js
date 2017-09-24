import React from 'react';
import GithubLikeDiff from 'react-gh-like-diff';
import axios from 'axios';

class App extends React.Component {
  state = {
    diffString: ''
  };

  handleInput = event => {
    if (event.keyCode === 13) {
      const url = event.target.value;

      axios
        .get(url, { headers: { Accept: 'application/vnd.github.v3.diff' } })
        .then(response =>
          this.setState((prevStates, props) => ({ diffString: response.data }))
        );
    }

    return;
  };

  render() {
    return (
      <div className="container">
        <h2>Fetching Github repository commit difference.</h2>
        <input type="text" onKeyDown={this.handleInput} />
        <GithubLikeDiff diffString={this.state.diffString} />
      </div>
    );
  }
}

export default App;
