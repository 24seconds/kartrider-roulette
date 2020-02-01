import React, { Component } from 'react';

export default class TrackThemeCheckboxComponent extends Component {
  render() {
    const { name } = this.props;

    return (
      <div className='kartrider-track-theme-checkbox-component'>
        <label className="track-theme-checkbox">
          <input type="checkbox" />
          <span>{ name ? name : '스피드' }</span>
        </label>
      </div>
    );
  }
}