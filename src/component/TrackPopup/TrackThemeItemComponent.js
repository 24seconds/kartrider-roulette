import React, { Component } from 'react';
import iconAbyss from '../../asset/abyss.png';

export default class TrackThemeItemComponent extends Component {
  render() {
    return (
      <div className='kartrider-track-theme-item-component'>
        <img src={ iconAbyss } alt='track theme icon'/>
        <p>어비스</p>
      </div>
    );
  }
}