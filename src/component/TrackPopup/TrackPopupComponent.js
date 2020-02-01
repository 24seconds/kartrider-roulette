import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import TrackContainerComponent from './TrackContainerComponent';
import TrackPopupHeaderComponent from './TrackPopupHeaderComponent';
import TrackPopupFooterComponent from './TrackPopupFooterComponent';
import { closePopup } from '../../redux/action';

class TrackPopupComponent extends Component {
  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    console.log('onClose');
    this.props.closePopup();
  }

  render() {
    const { isPopupOpen } = this.props;

    return (
      <Fragment>
        {
          isPopupOpen ?
          <div className='kartrider-track-popup-component'>
            <div className='track-popup-container'>
              <TrackPopupHeaderComponent onClose={ this.onClose } />
              <TrackContainerComponent />
              <TrackPopupFooterComponent onClose={ this.onClose } />
            </div>
          </div> :
          null
        }
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({ isPopupOpen: state.isPopupOpen });
export default connect(mapStateToProps, { closePopup })(TrackPopupComponent);