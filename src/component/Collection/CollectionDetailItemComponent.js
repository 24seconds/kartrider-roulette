import React, { Component } from 'react';
import { IMAGE_URL, ROULETTE_COLLECTION_ID } from '../../database/constant';
import IndexedDbManager from '../../database/IndexedDbManager';
import hansearch from "hangul-search";

export default class CollectionDetailItemComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trackList: [],
      themeList: [],
      mapInputValue : '',
    }
    this.onBack = this.onBack.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
    this.getTrackLength = this.getTrackLength.bind(this);
    this.handleSearchMapNameOnChange = this.handleSearchMapNameOnChange.bind(this);
  }

  onBack() {
    this.props.onClick(false, null);
    this.setState({ mapInputValue: '' })
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

  render() {
    const { trackList, collectionId } = this.props;
    const { themeList } = this.state;
    const { mapInputValue } = this.state;
    return (
      <div className='kartrider-collection-detail-item-component'>
        <h3 className='collection-detail-title' >
          <div>
            { this.getDetailTitle() }
          </div>
          <input
            className='map-search-input'
            type="text"
            value={this.state.mapInputValue}
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
                imageName: track.imageName.replace(/\s+/g, ''),
              }));
              const searchTrack = hansearch(processedTracks, mapInputValue.replace(/\s+/g, ''), ["imageName"]);
              if (!tracks.length) {
                return null;
              }
              return searchTrack.items.map(track => {
                  return (
                    <div key={ `key-detail-${track['trackName']}` } className='collection-detail-track'>
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
