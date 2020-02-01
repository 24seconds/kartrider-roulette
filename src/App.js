import React, { Component } from 'react';
import './App.css';
import './style/index.scss';

import RouletteResultComponent from './component/RouletteResultComponent';
import PlayRouletteComponent from './component/PlayRouletteComponent';
import SearchComponent from './component/Search/SearchComponent';
import CollectionComponent from './component/Collection/CollectionComponent';
import TrackPopupComponent from './component/TrackPopup/TrackPopupComponent';
import './component/IndexedDbManager';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h3>카트라이더 룰렛!</h3>
        <RouletteResultComponent trackName={ '어비스 스카이라인' } />
        <PlayRouletteComponent />
        <SearchComponent />
        <CollectionComponent />
        <TrackPopupComponent />
      </div>
    );
  }
}

export default App;
