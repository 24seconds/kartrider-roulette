import React, { Component } from 'react';
import TrackThemeCheckboxComponent from './TrackThemeCheckboxComponent';
import { IMAGE_URL } from '../../database/constant';


export default class TrackPopupHeaderComponent extends Component {
  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  onClose() {
    const { onClose } = this.props;
    onClose();
  }

  onCheck(trackType, isChecked) {
    const { onCheck } = this.props;
    if (onCheck) {
      onCheck(trackType, isChecked);
    }
  }

  render() {
    const { name, trackTypeCheckbox, onChange } = this.props;

    return (
      <div className='kartrider-track-popup-header-component'>
        <div className='track-popup-header'>
          <div className='track-popup-title'>
            <input
              type='text'
              placeholder='컬렉션 이름 ex) 나만의 컬렉션'
              value={ name }
              onChange={ onChange } />
          </div>
          <button className='track-popup-close' onClick={ this.onClose }>
            <img src={ `${IMAGE_URL}/close.png` } alt='track popup close'/>
          </button>
        </div>
        <div className='track-popup-theme'>
          <div className='track-theme-text'>
            테마선택
          </div>
          <div className='track-theme-selector'>
            <TrackThemeCheckboxComponent
              name={ '스피드' }
              isChecked={ trackTypeCheckbox['speed'] }
              onChange={ this.onCheck }/>
            <TrackThemeCheckboxComponent
              name={ '아이템' }
              isChecked={ trackTypeCheckbox['item'] }
              onChange={ this.onCheck }/>
            <TrackThemeCheckboxComponent
              name={ '전체' }
              isChecked={ trackTypeCheckbox['all'] }
              onChange={ this.onCheck }/>
          </div>
        </div>
      </div>
    );
  }
}