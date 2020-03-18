import React, { Component } from 'react';
import { ReactGhLikeDiff } from 'react-gh-like-diff';
import fetch from 'unfetch';
import { TITLE, PAST, CURRENT } from './constants';
import './App.css';
import 'react-gh-like-diff/dist/css/diff2html.min.css';

class App extends Component {
  state = {
    past: '',
    current: ''
  };

  componentDidMount() {
    fetch(PAST)
    .then(response => response.text())
    .then(past => this.setState({ past }));

    fetch(CURRENT)
    .then(response => response.text())
    .then(current => this.setState({ current }));
  }

  render() {
    return (
      <div className="App">
        <ReactGhLikeDiff
          options={{
            originalFileName: TITLE,
            updatedFileName: TITLE,
          }}
          past={this.state.past}
          current={this.state.current}
        />
      </div>
    );
  }
}

export default App;
