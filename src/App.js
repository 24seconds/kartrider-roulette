import React, { Component } from 'react';
import './App.css';
import './style/index.scss';

import RouletteResultComponent from './component/RouletteResultComponent';
import PlayRouletteComponent from './component/PlayRouletteComponent';
import CollectionComponent from './component/Collection/CollectionComponent';
import DataSourceDescripitonComponent from './component/DataSourceDescripitonComponent';
import './database/IndexedDbManager.js';


class App extends Component {
  render() {
    return (
      <div className="App">
        <h3>카트라이더 룰렛!</h3>
        <RouletteResultComponent trackName={ '어비스 스카이라인' } />
        <PlayRouletteComponent />
        <DataSourceDescripitonComponent />
        <CollectionComponent />
      </div>
    );
  }
}

export default App;
