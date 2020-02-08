import React, { Component } from 'react';
import { IMAGE_URL } from '../../redux/store';

export default class TrackThemeItemComponent extends Component {
  render() {
    return (
      <div className='kartrider-track-theme-item-component'>
        <img src={ `${IMAGE_URL}/abyss.png` } alt='track theme icon'/>
        <p>어비스</p>
      </div>
    );
  }
}