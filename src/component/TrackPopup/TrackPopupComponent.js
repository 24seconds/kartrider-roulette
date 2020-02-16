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
      collectionTrackSet: new Set(),
      themeList: [],
      selectedTheme: null,
      selectedTrackList: [],
      trackTypeCheckbox: {
        speed: false,
        item: false,
        all: false,
      }
    };

    this.onSelectTheme = this.onSelectTheme.bind(this);
    this.onSelectTrack = this.onSelectTrack.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onCheck = this.onCheck.bind(this);
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

  onCheck(trackType, isChecked) {
    const {
      selectedTrackList,
      collectionTrackSet,
      trackTypeCheckbox,
    } = this.state;

    const trackListToAdd = ((currentTrackList, trackType) => {
      if (trackType === 'all') {
        return currentTrackList.map(track => track['trackName']);
      } else {
        return currentTrackList.filter(track => {
          return track['trackType'] === trackType;
        }).map(track => track['trackName']);
      }
    })(selectedTrackList, trackType);

    const nextCollectionTrackSet = ((collectionTrackSet, trackListToAdd, isChecked) => {
      if (isChecked) {
        return new Set([...collectionTrackSet, ...trackListToAdd]);
      } else {
        const trackListToAddSet = new Set(trackListToAdd);
        return new Set([...collectionTrackSet].filter(track => !trackListToAddSet.has(track)));
      }
    })(collectionTrackSet, trackListToAdd, isChecked);

    this.setState({
      collectionTrackSet: nextCollectionTrackSet,
      trackTypeCheckbox: {
        ...trackTypeCheckbox,
        [trackType]: isChecked,
      }
    });
  }

  async getTrackList(theme) {
    const trackList = await IndexedDbManager.getTrackByTheme(theme);

    trackList.sort((a, b) => {
      if (a['isReverse'] && !b['isReverse']) {
        return 1;
      }

      if (!a['isReverse'] && b['isReverse']) {
        return -1;
      }

      return b['difficulty'] - a['difficulty'];
    });

    return trackList;
  }

  async onSelectTheme(theme) {
    const selectedTrackList = await this.getTrackList(theme['themeName']);
    this.setState({
      selectedTheme: theme,
      selectedTrackList
    });
  }

  onSelectTrack(track, isSelected) {
    const { collectionTrackSet } = this.state;
    const nextCollectionTrackSet = ((collectionTrackSet, isSelected) => {
      if (isSelected) {
        // add to set
        return new Set([...collectionTrackSet, track['trackName']]);
      } else {
        // remove from set
        return new Set([...collectionTrackSet].filter(trackName => trackName !== track['trackName']));
      }
    })(collectionTrackSet ,isSelected);

    this.setState({
      collectionTrackSet: nextCollectionTrackSet,
    });
  }

  async componentDidMount() {
    const { collection } = this.props;

    const themeList = await IndexedDbManager.getAllThemeList();
    themeList.sort((a, b) => b['themeOrder'] - a['themeOrder']);

    const selectedTheme = themeList[0];
    const selectedTrackList = await this.getTrackList(selectedTheme['themeName']);

    this.setState({
      collectionTrackSet: new Set(collection['trackList']),
      themeList,
      selectedTheme,
      selectedTrackList
    });
  }

  render() {
    const { collection } = this.props;
    const {
      themeList,
      collectionTrackSet,
      selectedTheme,
      selectedTrackList,
      trackTypeCheckbox,
    } = this.state;

    return (
      <div className='kartrider-track-popup-component'>
        <div className='track-popup-container'>
          <TrackPopupHeaderComponent
            name={ collection['name'] }
            onCheck={ this.onCheck }
            onClose={ this.onClose }
            trackTypeCheckbox={ trackTypeCheckbox } />
          <TrackContainerComponent
            themeList={ themeList }
            onSelectTheme={ this.onSelectTheme }
            onSelectTrack={ this.onSelectTrack }
            selectedTheme={ selectedTheme }
            selectedTrackList={ selectedTrackList }
            collectionTrackSet={ collectionTrackSet } />
          <TrackPopupFooterComponent onClose={ this.onClose } />
        </div>
      </div>
    );
  }
}
