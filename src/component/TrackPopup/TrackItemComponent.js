import React, { Component } from 'react';
import { IMAGE_URL } from '../../redux/store';

export default class TrackItemComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dotArray: [0,1,2,3,4]
    };
  }

  render() {
    const { track = null } = this.props;
    const { dotArray } = this.state;

    return (
      track &&
      <div className='kartrider-track-item-component'>
        {/* selected or not */}
        <div className='border'>
          <div className='track-difficulty'>
            <div className='text'>
              난이도
            </div>
            <div className='dot-container'>
              {
                dotArray.map(i => {
                  if (i <= track['difficulty'] - 1) {
                    return (
                      <div className='dot on'></div>
                    );
                  } else {
                    return (
                      <div className='dot'></div>
                    );
                  }
                })
              }
            </div>
          </div>
          { track['isReverse'] &&
            <div className='special reverse'>
              Reverse
            </div>
          }
          { track['isCrazy'] &&
            <div className='special crazy'>
              Crazy
            </div>
          }
          <div className='track-image' >
            <img src={ `${IMAGE_URL}/track/${ track['imageName'] }.png` } alt="track icon" />
          </div>
        </div>
        <div className='track-name'>
          { track['trackName'] }
        </div>
      </div>
    );
  }
}