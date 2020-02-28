import React, { Component } from 'react';
import './App.css';
import './style/index.scss';

import RouletteComponent from './component/Roulette/RouletteComponent';
import CollectionComponent from './component/Collection/CollectionComponent';
import DataSourceDescripitonComponent from './component/DataSourceDescripitonComponent';
import FooterComponent from './component/FooterComponent';
import './database/IndexedDbManager.js';


class App extends Component {
  render() {
    return (
      <div className="App">
        <h3>카트라이더 룰렛!</h3>
        {/* <AppHeaderComponent/> */}
        <RouletteComponent />
        <DataSourceDescripitonComponent />
        <CollectionComponent />
        <FooterComponent />
      </div>
    );
  }
}

export default App;
