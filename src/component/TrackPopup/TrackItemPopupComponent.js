import React, { Component } from 'react';
import { IMAGE_URL } from '../../database/constant';

export default class TrackItemPopupComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dotArray: [0, 1, 2, 3, 4],
    };
  }

  render() {
    const { track } = this.props;
    const { dotArray } = this.state;
    return (
      <div className='kartrider-track-item-component popup-component'>
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
                      <div key={i} className='dot on'></div>
                    );
                  } else {
                    return (
                      <div key={i} className='dot'></div>
                    );
                  }
                })
              }
            </div>
          </div>
          {track['isReverse'] &&
            <div className='special reverse'>
              Reverse
            </div>
          }
          {track['isCrazy'] &&
            <div className='special crazy'>
              Crazy
            </div>
          }
          <div className='track-image' >
            <img src={`${IMAGE_URL}/track/${track['imageName']}.png`} alt="track icon" />
          </div>
        </div>
      </div>
    );
  }
}
