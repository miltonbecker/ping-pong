import React, { Component } from 'react';
import PlayersRanking from './components/PlayersRanking';
import MatchResult from './components/MatchResult';

export class App extends Component {
  render() {
    return (
      <div className='container-fluid'>
        <PlayersRanking />
        <MatchResult />
      </div>
    );
  }
}