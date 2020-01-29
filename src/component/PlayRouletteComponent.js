import React, { Component } from 'react';

export default class PlayRouletteComponent extends Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    // do something here!
    console.log('onClick is called');
  }

  render() {
    return (
      <button onClick={ this.onClick }>
        Play Roulette!
      </button>
    );
  }
}