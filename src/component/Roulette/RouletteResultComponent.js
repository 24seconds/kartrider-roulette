import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  ROULETTE_HEIGHT,
  ROULETTE_ANIMATION_DURATION,
  ROULETTE_RESULT_PLACEHOLDER,
  ROULETTE_RESULT_GUIDE
} from '../../database/constant';

class RouletteResultComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      styleTransform: {
        container: {
          transform: `translateY(${ -ROULETTE_HEIGHT }px)`,
        },
      },
      displayName: {
        zero: ROULETTE_RESULT_PLACEHOLDER,
        one: ROULETTE_RESULT_PLACEHOLDER,
        two: ROULETTE_RESULT_PLACEHOLDER
      },
      counter: 0,
      cursor: 0,
      baseTranslation: -ROULETTE_HEIGHT,
      lastAnimationRequest: null,
      shouldStop: false,
    };

    this.onPlayRoulette = this.onPlayRoulette.bind(this);
  }

  onPlayRoulette() {
    const { rouletteSet } = this.props;
    const { displayName, cursor } = this.state;
    const trackList = Object.keys(rouletteSet);

    if (trackList.length === 0) {
      this.setState({
        displayName: {
          ...displayName,
          one: ROULETTE_RESULT_GUIDE,
        },
      });

      return;
    }

    setTimeout(() => {
      this.setState({
        shouldStop: true,
      });
    }, ROULETTE_ANIMATION_DURATION);

    this.setState({
      displayName: {
        ...displayName,
        two: trackList[(cursor + 1) % trackList.length],
      },
    });

    requestAnimationFrame(this.animationCallback.bind(this, trackList));
  }

  getStyleTransform(counter, scale, iteration, baseTranslation) {
    const pixel = ((counter, scale, iteration, baseTranslation) => {
      if (counter * scale <= iteration) {
        return -counter * scale + baseTranslation;
      } else {
        return baseTranslation;
      }

    })(counter, scale, iteration, baseTranslation);

    return {
      transform: `translateY(${ pixel }px)`,
    }
  }

  animationCallback(trackList) {
    const {
      styleTransform,
      counter,
      displayName,
      baseTranslation,
      cursor,
      shouldStop
    } = this.state;

    const iteration = ROULETTE_HEIGHT;
    const scale = 5;
    const nextStyleTransform = {
      ...styleTransform,
      container: {
        ...styleTransform['container'],
        ...this.getStyleTransform(counter, scale, iteration, baseTranslation),
      }
    };

    if (counter * scale >= iteration) {
      const stateToUpdate = {
        styleTransform: nextStyleTransform,
        displayName: {
          ...displayName,
          one: trackList[(cursor + 1) % trackList.length],
          two: trackList[(cursor + 2) % trackList.length],
        },
        cursor: cursor + 1,
        counter: 0,
      };

      if (!shouldStop) {
        requestAnimationFrame(this.animationCallback.bind(this, trackList));
      } else {
        stateToUpdate['shouldStop'] = false;
      }

      this.setState(stateToUpdate);
      return;
    }

    if (counter * scale < iteration) {
      requestAnimationFrame(this.animationCallback.bind(this, trackList));

      this.setState({
        styleTransform: nextStyleTransform,
        counter: counter + 1,
      });
    }
  }

  render() {
    // const { rouletteResult } = this.props;
    const { styleTransform, displayName } = this.state;
 
    return (
      <div className='roulette-result-component'>
        {/* { rouletteResult ? rouletteResult : 'Run roulette!' } */}
        <button onClick={ this.onPlayRoulette }>
          테스트 requestAnimationFrame
        </button>
        <div className='roulette-result'>
          <div className='roulette-container' style={ styleTransform['container'] } >
            <div className='zero'>
              { displayName['zero'] }
            </div>
            <div className='one'>
              { displayName['one'] }
            </div>
            <div className='two'>
              { displayName['two'] }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  rouletteResult: state.rouletteResult,
  rouletteSet: state.rouletteSet
});
export default connect(mapStateToProps)(RouletteResultComponent);
