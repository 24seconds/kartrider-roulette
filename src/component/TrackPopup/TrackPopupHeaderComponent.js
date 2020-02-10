import React, { Component } from 'react';
import TrackThemeCheckboxComponent from './TrackThemeCheckboxComponent';
import { IMAGE_URL } from '../../redux/store';


export default class TrackPopupHeaderComponent extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onChange() {

  }

  onClose() {
    console.log('onClose');
    const { onClose } = this.props;
    onClose();
  }

  render() {
    const { name } = this.props;

    return (
      <div className='kartrider-track-popup-header-component'>
        <div className='track-popup-header'>
          <div className='track-popup-title'>
            <input
              type='text'
              placeholder='컬렉션 이름 ex) 나만의 컬렉션'
              value={ name }
              onChange={ this.onChange } />
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
            <TrackThemeCheckboxComponent name={ '스피드' } />
            <TrackThemeCheckboxComponent name={ '아이템' } />
            <TrackThemeCheckboxComponent name={ '전체' } />
          </div>
        </div>
      </div>
    );
  }
}