import React, { Component } from 'react';
import { defaultTrackType } from '../../database/constant';

export default class TrackThemeCheckboxComponent extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    const { name, onChange, isChecked } = this.props;

    if (onChange) {
      onChange(defaultTrackType[name], !isChecked);
    }
  }

  render() {
    const { name, isChecked } = this.props;

    return (
      <div className='kartrider-track-theme-checkbox-component'>
        <label className="track-theme-checkbox">
          <input
            type="checkbox"
            onChange={ this.onChange }
            checked={ isChecked }/>
          <span>{ name ? name : '스피드' }</span>
        </label>
      </div>
    );
  }
}