import React, { Component } from 'react';
import { connect } from "react-redux";
import RouletteResultComponent from './RouletteResultComponent';
import PlayRouletteComponent from './PlayRouletteComponent';

export default class RouletteComponent extends Component {
  render() {
    const { rouletteResult } = this.props;
 
    return (
      <div id='kartrider-roulette-component'>
        <div>룰렛컴포넌트</div>
        <RouletteResultComponent/>
        <PlayRouletteComponent />
      </div>
    );
  }
}