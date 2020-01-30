import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateRoulletteResult } from '../redux/action';

class PlayRouletteComponent extends Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const track = (() => {
      const rouletteArray = Array.from(this.props.rouletteSet);

      return rouletteArray[Math.floor(Math.random() * rouletteArray.length)];
    })();

    this.props.updateRoulletteResult(track);
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

const mapStateToProps = state => ({ rouletteSet: state.rouletteSet });
export default connect(mapStateToProps, { updateRoulletteResult })(PlayRouletteComponent);
