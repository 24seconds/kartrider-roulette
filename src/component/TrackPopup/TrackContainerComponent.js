import React, { Component } from 'react';
import TrackThemeItemComponent from './TrackThemeItemComponent';
import TrackItemComponent from './TrackItemComponent';

export default class TrackContainerComponent extends Component {
  render() {
    return (
      <div className='kartrider-track-container-component'>
        <div className='track-theme-selector-container'>
          <TrackThemeItemComponent />
          <TrackThemeItemComponent />
          <TrackThemeItemComponent />
          <TrackThemeItemComponent />
          <TrackThemeItemComponent />
          <TrackThemeItemComponent />
          <TrackThemeItemComponent />
          <TrackThemeItemComponent />
          <TrackThemeItemComponent />
          <TrackThemeItemComponent />
        </div>
        <div className='track-item-container'>
          <TrackItemComponent />
          <TrackItemComponent />
          <TrackItemComponent />
          <TrackItemComponent />
          <TrackItemComponent />
          <TrackItemComponent />
          <TrackItemComponent />
        </div>
      </div>
    );
  }
}