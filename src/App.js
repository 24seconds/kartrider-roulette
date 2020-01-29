import React, { Component } from 'react';
import './App.css';
import './style/ResultTrackComponent.scss';
import './style/TrackListComponent.scss';

import ResultTrackComponent from './component/ResultTrackComponent';
import PlayRouletteComponent from './component/PlayRouletteComponent';
import SearchComponent from './component/Search/SearchComponent';
import TrackListComponent from './component/Search/TrackListComponent';
import './component/IndexedDbManager';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h3>카트라이더 룰렛!</h3>
        <ResultTrackComponent trackName={ '어비스 스카이라인' } />
        <PlayRouletteComponent />
        <SearchComponent />
        <TrackListComponent />
      </div>
    );
  }
}

export default App;
