import React, { Component } from 'react';
import { IMAGE_URL, ROULETTE_COLLECTION_ID } from '../../database/constant';
import IndexedDbManager from '../../database/IndexedDbManager';
import hansearch from "hangul-search";
import TrackItemPopupComponent from "../TrackPopup/TrackItemPopupComponent";
import ReactDOM from 'react-dom';

export default class CollectionDetailItemComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trackList: [],
      themeList: [],
      mapInputValue: '',
      isShowPopup: false,
      selectedTrack: null,
      mouseX: 0,
      mouseY: 0,
    };
    this.onBack = this.onBack.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
    this.getTrackLength = this.getTrackLength.bind(this);
    this.handleSearchMapNameOnChange = this.handleSearchMapNameOnChange.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  onBack() {
    this.props.onClick(false, null);
    this.setState({ mapInputValue: '' });
  }

  onDeleteItem(trackName) {
    const { collectionId, onDelete } = this.props;

    if (onDelete) {
      onDelete(collectionId, trackName);
    }
  }

  async componentDidMount() {
    const themeList = await IndexedDbManager.getAllThemeList();
    themeList.sort((a, b) => b['themeOrder'] - a['themeOrder']);

    this.setState({
      themeList,
    });
  }

  getTrackLength(trackList) {
    return Object.values(trackList).reduce((acc, array) => {
      const arr = array || [];
      acc += arr.length;

      return acc;
    }, 0);
  }

  getDetailTitle() {
    const { collectionId, trackList } = this.props;

    if (collectionId === ROULETTE_COLLECTION_ID) {
      return `룰렛에 있는 트랙 (${ this.getTrackLength(trackList) })`;
    } else {
      return `선택된 트랙 (${ this.getTrackLength(trackList) })`;
    }
  }
  
  handleSearchMapNameOnChange(e) {
    this.setState({ mapInputValue: e.target.value });
  }

  handleMouseEnter(track) {
    this.setState({ isShowPopup: true, selectedTrack: track });
  }

  handleMouseLeave() {
    this.setState({ isShowPopup: false });
  }

  handleMouseMove(event) {
    this.setState({
      mouseX: event.clientX,
      mouseY: event.clientY,
    });
  }

  createPortalPopup() {
    const { isShowPopup, selectedTrack, mouseX, mouseY } = this.state;
    if (!isShowPopup) return null;
      const style = {
        position: 'absolute',
        left: `${mouseX - 100}px`,
        top: `${mouseY - 170}px`,
      };
      return (
        <div
          className="popup-container"
          style={style}
        >
          <TrackItemPopupComponent
            track={selectedTrack}
          />
        </div>
      );
  }

  render() {
    const { trackList, collectionId } = this.props;
    const { themeList, mapInputValue } = this.state;
    const body = document.querySelector('body');
    return (
      <div className='kartrider-collection-detail-item-component'>
        <h3 className='collection-detail-title' >
          <div>
            { this.getDetailTitle() }
          </div>
          <input
            className='map-search-input'
            type="text"
            value={mapInputValue}
            onChange={this.handleSearchMapNameOnChange}
            placeholder="맵 이름 검색"
          />
          <button className='collection-detail-back' onClick={ this.onBack } >
            <img src={ `${IMAGE_URL}/icon_back.png` } alt="back to collection list icon" />
          </button>
        </h3>
        <div className='collection-detail-track-container'>
          {
            themeList.map(theme => {
              const tracks = trackList[theme['themeName']] || [];
              const processedTracks = tracks.map((track) => ({
                ...track,
                searchTrackName: track.trackName.replace(/\s+/g, ''),
              }));
              const searchTrack = hansearch(processedTracks, mapInputValue.replace(/\s+/g, ''), ["searchTrackName",'imageName','trackName']);           
              if (!tracks.length) {
                return null;
              }
               return searchTrack.items.map(track => {
                  return (
                    <div
                      key={ `key-detail-${track['trackName']}` }
                      className='collection-detail-track'
                      onMouseEnter={this.handleMouseEnter.bind(this, track)}
                      onMouseLeave={this.handleMouseLeave}
                      onMouseMove={this.handleMouseMove}
                    >
                      {body && ReactDOM.createPortal(this.createPortalPopup(), body)}
                      <img src={ `${IMAGE_URL}/theme/${track.theme}.png` } alt="track icon" />
                      <div>
                        { track['trackName'] }
                      </div>
                      {
                        collectionId === ROULETTE_COLLECTION_ID
                        ? null
                        : <button className='collection-detail-delete' onClick={ this.onDeleteItem.bind(this, track['trackName']) }>
                            <img src={ `${IMAGE_URL}/icon_delete.svg` } alt="delete icon" />
                          </button>
                      }
                    </div>
                  );
              })
            })
          }
        </div>
      </div>
    )
  }
}

CollectionDetailItemComponent.defaultProps = {
  "trackList": {},
};
