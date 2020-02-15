import React, { Component } from 'react';
import { IMAGE_URL } from '../../redux/store';

export default class TrackItemComponent extends Component {
  render() {
    const { track = null } = this.props;

    return (
      track &&
      <div className='kartrider-track-item-component'>
        {/* selected or not */}
        <div className='border'>
          <div className='track-image' >
            <img src={ `${IMAGE_URL}/track/${ track['displayName'] }.png` } alt="track icon" />
          </div>
        </div>
        <div className='track-name'>
          { track['trackName'] }
        </div>
      </div>
    );
  }
}