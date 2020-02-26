import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TrackContainerComponent from './TrackContainerComponent';
import TrackPopupHeaderComponent from './TrackPopupHeaderComponent';
import TrackPopupFooterComponent from './TrackPopupFooterComponent';
import IndexedDbManager from '../../database/IndexedDbManager';
import { UPDATE_COLLECTION } from '../../database/constant';

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
      },
      collectionName: '',
    };
    this.divFocus = React.createRef();

    this.onSelectTheme = this.onSelectTheme.bind(this);
    this.onSelectTrack = this.onSelectTrack.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.onInputValueChange = this.onInputValueChange.bind(this);
    this.onKeyDownTest = this.onKeyDownTest.bind(this);
  }

  static open(props) {
    const promise = new Promise((resolve, reject) => {
      const component = React.createElement(
        this, { ...props, resolve }, null);
      ReactDOM.render(component, document.getElementById('popup-root'));
    });

    return promise;
  }

  close(isSubmit) {
    const { resolve, collection } = this.props;
    const emptyValue = {
      action: null,
    };

    try {
      if (isSubmit) {
        const diff = this.getDiffCollection();
        const value = ((diff, collection) => {
          if (Object.keys(diff).length) {
            return {
              action: UPDATE_COLLECTION,
              payload: {
                ...collection,
                ...diff
              }
            }
          } else {
            return {
              action: null,
            };
          }
        })(diff, collection);

        resolve(value);
      } else {
        resolve(emptyValue);
      }
    } catch (error) {
      resolve(emptyValue);
    } finally {
      const popupRoot = document.getElementById('popup-root');
      ReactDOM.unmountComponentAtNode(popupRoot);
    }
  }

  getDiffCollection() {
    const { collection } = this.props;
    const { collectionName, collectionTrackSet } = this.state;
    const payload = {};


    if (collection['name'] !== collectionName) {
      payload['name'] = collectionName;
    }

    if (collection['trackList'].length !== collectionTrackSet.size) {
      payload['trackList'] = [...collectionTrackSet];
    } else {
      const arr = collection['trackList'].filter(track => collectionTrackSet.has(track));

      if (arr.length !== collectionTrackSet.size) {
        payload['trackList'] = [...collectionTrackSet];
      }
    }

    return payload;
  }

  onInputValueChange(event) {
    this.setState({
      collectionName: event.target.value,
    });
  }

  onClose(isSubmit = false) {
    this.close(isSubmit);
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
      selectedTrackList,
      trackTypeCheckbox: {
        speed: false,
        item: false,
        all: false,
      },
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

    this.divFocus.current.focus();

    this.setState({
      collectionTrackSet: new Set(collection['trackList']),
      themeList,
      selectedTheme,
      selectedTrackList,
      collectionName: collection['name'],
    });
  }

  onKeyDownTest(event) {
    if (event.type === 'keydown' && event.keyCode === 27) {
      this.onClose(false);
    }
  }

  render() {
    const {
      themeList,
      collectionTrackSet,
      selectedTheme,
      selectedTrackList,
      trackTypeCheckbox,
      collectionName,
    } = this.state;

    return (
      <div className='kartrider-track-popup-component'>
        <div className='track-popup-container'
          tabIndex="0"
          ref={ this.divFocus }
          onKeyDown={ this.onKeyDownTest }>
          <TrackPopupHeaderComponent
            name={ collectionName }
            onCheck={ this.onCheck }
            onClose={ this.onClose }
            onChange={ this.onInputValueChange }
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
