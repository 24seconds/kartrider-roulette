import React, { Component } from 'react';
import { connect } from "react-redux";

class RouletteResultComponent extends Component {
  render() {
    const { rouletteResult } = this.props;
 
    return (
      <div id='roulette-result-component'>
        { rouletteResult ? rouletteResult : 'Run roulette!' }
      </div>
    );
  }
}

const mapStateToProps = state => ({ rouletteResult: state.rouletteResult });
export default connect(mapStateToProps)(RouletteResultComponent);