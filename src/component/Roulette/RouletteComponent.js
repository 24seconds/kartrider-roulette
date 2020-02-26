import React, { Component } from 'react';
import RouletteResultComponent from './RouletteResultComponent';

export default class RouletteComponent extends Component {
  render() {
 
    return (
      <div className='kartrider-roulette-component'>
        <div>룰렛컴포넌트</div>
        <RouletteResultComponent/>
      </div>
    );
  }
}