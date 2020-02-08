import React, { Component } from 'react';
import { IMAGE_URL } from '../../redux/store';

export default class TrackItemComponent extends Component {
  render() {
    return (
      <div className='kartrider-track-item-component'>
        {/* selected or not */}
        <div className='border'>
          <div className='track-image' >
            <img src={ `${IMAGE_URL}/어비스 스카이라인.png` } alt="track icon" />
          </div>
        </div>
        <div className='track-name'>
          어비스 스카이라인
        </div>
      </div>
    );
  }
}