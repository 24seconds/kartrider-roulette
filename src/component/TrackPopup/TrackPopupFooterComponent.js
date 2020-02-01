import React, { Component } from 'react';


export default class TrackPopupFooterComponent extends Component {

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    // store collection in IDB
    // check collection title is filled or not
    this.props.onClose();
  }

  render() {
    return (
      <div className='kartrider-track-popup-footer-component'>
        <button className='footer-okay' onClick={ this.onSubmit }>
          선택
        </button>
        <button className='footer-close' onClick={ this.props.onClose }>
          취소
        </button>
      </div>
    );
  }
}
