import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  ROULETTE_HEIGHT,
  ROULETTE_ANIMATION_DURATION,
  ROULETTE_RESULT_PLACEHOLDER,
  ROULETTE_RESULT_GUIDE,
  ROULETTE_SCALE,
  LOCAL_STORAGE_ANIMATION_KEY,
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
      pixelAccumulated: 0,
      cursor: 0,
      baseTranslation: -ROULETTE_HEIGHT,
      lastAnimationRequest: null,
      shouldStop: false,
      shouldPrepareStop: false,
      cubicBezierCurve: this.getCubicBezierCurve(
        // ease
        [0,0],
        [0.25, 0.1],
        [0.25, 1.0],
        [1.0, 1.0]
      ),
      startTime: null,
      rouletteResult: null,
      isAnimationOn: false,
    };

    this.onPlayRoulette = this.onPlayRoulette.bind(this);
    this.onAnimationToggle = this.onAnimationToggle.bind(this);
  }

  componentDidMount() {
    const value = localStorage.getItem(LOCAL_STORAGE_ANIMATION_KEY);
    if (value) {
      try {
        const { isAnimationOn } = JSON.parse(value);

        this.setState({
          isAnimationOn
        });
      } catch (error) {
        // error occurred!
      }
    }
  }

  updateLocalStorage(key, value) {
    localStorage.setItem(key, value);
  }

  shuffleFisherYates(array) {
    const shuffledArray = [...array];

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffledArray[i];

      shuffledArray[i] = shuffledArray[j];
      shuffledArray[j] = temp;
    }

    return shuffledArray;
  }

  getCubicBezierCurve(p1, p2, p3, p4) {
    const [x1, y1] = p1;
    const [x2, y2] = p2;
    const [x3, y3] = p3;
    const [x4, y4] = p4;

    return function (t) {
      const fun = (p1, p2, p3, p4) => {
        return Math.pow(1 - t, 3) * p1
          + 3 * Math.pow(1 - t, 2) * t * p2
          + 3 * (1 - t) * Math.pow(t, 2) * p3
          + Math.pow(t, 3) * p4;
      };

      const xt = fun(x1, x2, x3, x4);
      const yt = fun(y1, y2, y3, y4);

      return [xt, yt];
    }
  }

  onAnimationToggle() {
    const { isAnimationOn } = this.state;

    this.updateLocalStorage(LOCAL_STORAGE_ANIMATION_KEY, JSON.stringify({ isAnimationOn: !isAnimationOn }));
    this.setState({
      isAnimationOn: !isAnimationOn,
    });
  }

  onPlayRoulette() {
    const { rouletteSet } = this.props;
    const { displayName, cursor, isAnimationOn } = this.state;
    const trackList = Object.keys(rouletteSet);
    const rouletteResult = trackList[Math.floor(Math.random() * trackList.length)];

    if (trackList.length === 0) {
      this.setState({
        displayName: {
          ...displayName,
          one: ROULETTE_RESULT_GUIDE,
        },
      });

      return;
    }

    if (isAnimationOn) {
      const shuffledTrackList = this.shuffleFisherYates(trackList);

      const startTime = new Date();
      setTimeout(() => {
        this.setState({
          shouldPrepareStop: true,
        });
      }, ROULETTE_ANIMATION_DURATION);

      this.setState({
        displayName: {
          ...displayName,
          two: trackList[(cursor + 1) % trackList.length],
        },
        startTime,
        rouletteResult,
      });

      requestAnimationFrame(this.animationCallback.bind(this, shuffledTrackList));
    } else {
      this.setState({
        displayName: {
          ...displayName,
          one: ' ',
        },
        rouletteResult
      });

      setTimeout(() => {
        this.setState({
          displayName: {
            ...displayName,
            one: rouletteResult,
          },
          rouletteResult: null
        });
      }, 200);
    }
  }

  getStyleTransform(pixelAccumulated, iteration, baseTranslation) {
    const pixel = ((pixelAccumulated, iteration, baseTranslation) => {
      if (pixelAccumulated < Math.abs(iteration)) {
        const nextPixel = -pixelAccumulated + baseTranslation

        return nextPixel;
      } else {

        return baseTranslation;
      }
    })(pixelAccumulated, iteration, baseTranslation);

    return {
      transform: `translateY(${ pixel }px)`,
    }
  }

  animationCallback(trackList) {
    const {
      styleTransform,
      pixelAccumulated,
      displayName,
      baseTranslation,
      cursor,
      shouldStop,
      shouldPrepareStop,
      cubicBezierCurve,
      startTime,
      rouletteResult
    } = this.state;

    const iteration = ROULETTE_HEIGHT;

    const elapsedTime = Math.min(1, (new Date() - startTime) / ROULETTE_ANIMATION_DURATION);
    const y = Math.min(1, cubicBezierCurve(elapsedTime)[1]);

    const scale = Math.max(0.6, ROULETTE_SCALE - ROULETTE_SCALE * (y));
    const nextPixelAccumulated = pixelAccumulated + Math.abs(scale);
    const nextStyleTransform = {
      ...styleTransform,
      container: {
        ...styleTransform['container'],
        ...this.getStyleTransform(nextPixelAccumulated, iteration, baseTranslation),
      }
    };

    if (nextPixelAccumulated >= Math.abs(iteration)) {
      const nextDisplayName = ((_displayName, shouldPrepareStop, shouldStop) => {
        const displayName = { ..._displayName };

        if (shouldPrepareStop && !shouldStop) {
          displayName['one'] = trackList[(cursor + 1) % trackList.length];
          displayName['two'] = rouletteResult;
        } else if (shouldStop) {
          displayName['one'] = rouletteResult;
          displayName['two'] = trackList[(cursor + 1) % trackList.length];
        } else {
          displayName['one'] = trackList[(cursor + 1) % trackList.length];
          displayName['two'] = trackList[(cursor + 2) % trackList.length];
        }

        return displayName;
      })(displayName, shouldPrepareStop, shouldStop);

      const stateToUpdate = {
        styleTransform: nextStyleTransform,
        displayName: nextDisplayName,
        cursor: cursor + 1,
        pixelAccumulated: 0,
      };

      if (shouldPrepareStop) {
        stateToUpdate['shouldStop'] = true;
      }

      if (!shouldStop) {
        requestAnimationFrame(this.animationCallback.bind(this, trackList));
      } else {
        stateToUpdate['startTime'] = null;
        stateToUpdate['shouldStop'] = false;
        stateToUpdate['shouldPrepareStop'] = false;
        stateToUpdate['rouletteResult'] = null;
      }

      this.setState(stateToUpdate);
      return;
    }

    if (nextPixelAccumulated < Math.abs(iteration)) {
      requestAnimationFrame(this.animationCallback.bind(this, trackList));

      this.setState({
        styleTransform: nextStyleTransform,
        pixelAccumulated: nextPixelAccumulated
      });
    }
  }

  render() {
    const {
      styleTransform,
      displayName,
      isAnimationOn,
      rouletteResult
    } = this.state;
 
    return (
      <div className='roulette-result-component'>
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
        <div className='roulette-util'>
          <button
            className={ `roulette-button ${ rouletteResult ? 'off' : 'on' }` }
            onClick={ this.onPlayRoulette }
            disabled={ rouletteResult !== null }>
            Play Roulette!
          </button>
          <div className='roulette-animation-on-off' onClick={ this.onAnimationToggle }>
            <div className='description'> 룰렛 애니메이션 </div>
            <div className= { `roulette-animation-switch ${ isAnimationOn ? 'on' : 'off' }` }>
              <div className='slider-container'>
                <div className={ `slider ${ isAnimationOn ? 'on' : 'off' }` }/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  rouletteSet: state.rouletteSet
});
export default connect(mapStateToProps)(RouletteResultComponent);
