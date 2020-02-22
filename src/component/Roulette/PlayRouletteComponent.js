import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateRoulletteResult } from '../../redux/action';
import { ROULETTE_RESULT_GUIDE } from '../../database/constant';

class PlayRouletteComponent extends Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const track = (() => {
      const rouletteArray = Object.keys(this.props.rouletteSet);

      if (rouletteArray.length === 0) {
        return ROULETTE_RESULT_GUIDE;
      }

      return rouletteArray[Math.floor(Math.random() * rouletteArray.length)];
    })();

    this.props.updateRoulletteResult(track);
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
