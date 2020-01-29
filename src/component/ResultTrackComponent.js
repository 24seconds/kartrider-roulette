import React, { Component } from 'react';

export default class ResultTrackComponent extends Component {

  render() {
    const { trackName } = this.props;
 
    return (
      <div id='result-track-component'>
        { trackName ? trackName : 'Run roulette!' }
      </div>
    );
  }
}