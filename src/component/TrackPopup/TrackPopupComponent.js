import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TrackContainerComponent from './TrackContainerComponent';
import TrackPopupHeaderComponent from './TrackPopupHeaderComponent';
import TrackPopupFooterComponent from './TrackPopupFooterComponent';
import IndexedDbManager from '../../database/IndexedDbManager';

export default class TrackPopupComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collectionTrackList: { },
      themeList: [],
    }

    this.onClose = this.onClose.bind(this);
  }

  static open(props) {
    const promise = new Promise((resolve, reject) => {
      const component = React.createElement(
        this, { ...props, resolve }, null);
      ReactDOM.render(component, document.getElementById('popup-root'));
    })

    return promise;
  }

  close() {
    const popupRoot = document.getElementById('popup-root');
    ReactDOM.unmountComponentAtNode(popupRoot);
  }

  onClose() {
    console.log('onClose');
    // resovle here;
    // resolve('some value')
    this.close();
  }

  async componentDidMount() {
    const themes = await IndexedDbManager.getAllThemeList();
    themes.sort((a, b) => b['themeOrder'] - a['themeOrder']);

    this.setState({
      themeList: themes,
    });
  }

  renderContent() {

  }

  render() {
    const { collection } = this.props;
    const { themeList } = this.state;

    return (
      <div className='kartrider-track-popup-component'>
        <div className='track-popup-container'>
          <TrackPopupHeaderComponent
            name={ collection['name'] } onClose={ this.onClose } />
          <TrackContainerComponent themeList={ themeList } />
          <TrackPopupFooterComponent onClose={ this.onClose } />
        </div>
      </div>
    );
  }
}
