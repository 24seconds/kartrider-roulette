import React, { Component } from 'react';


export default class TrackPopupFooterComponent extends Component {

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(isSubmit) {
    this.props.onClose(isSubmit);
  }

  render() {
    return (
      <div className='kartrider-track-popup-footer-component'>
        <button className='footer-okay'
          onClick={ this.onSubmit.bind(this, true) }>
          선택
        </button>
        <button className='footer-close'
          onClick={ this.onSubmit.bind(this, false) }>
          취소
        </button>
      </div>
    );
  }
}
