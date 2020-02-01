import React, { Component } from 'react';
import iconTrackAbyssSkyline from '../../asset/어비스 스카이라인.png';

export default class TrackItemComponent extends Component {
  render() {
    return (
      <div className='kartrider-track-item-component'>
        {/* selected or not */}
        <div className='border'>
          <div className='track-image' >
            <img src={ iconTrackAbyssSkyline } alt="track icon" />
          </div>
        </div>
        <div className='track-name'>
          어비스 스카이라인
        </div>
      </div>
    );
  }
}