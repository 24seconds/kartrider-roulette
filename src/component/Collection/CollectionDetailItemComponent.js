import React, { Component } from 'react';
import { IMAGE_URL } from '../../database/constant';
import IndexedDbManager from '../../database/IndexedDbManager';

export default class CollectionDetailItemComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trackList: [],
      themeList: [],
    }

    this.onBack = this.onBack.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
  }

  onBack() {
    this.props.onClick(false, null);
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

  render() {
    const { trackList } = this.props;
    const { themeList } = this.state;

    return (
      <div className='kartrider-collection-detail-item-component'>
        <h3 className='collection-detail-title' >
          <div>
            선택된 트랙
          </div>
          <button className='collection-detail-back' onClick={ this.onBack } >
            <img src={ `${IMAGE_URL}/icon_back.png` } alt="back to collection list icon" />
          </button>
        </h3>
        <div className='collection-detail-track-container'>
          {
            themeList.map(theme => {
              const tracks = trackList[theme['themeName']] || [];
              if (!tracks.length) {
                return null;
              }

              return tracks.map(track => {
                return (
                  <div key={ `key-detail-${track['trackName']}` } className='collection-detail-track'>
                    <img src={ `${IMAGE_URL}/theme/${track.theme}.png` } alt="track icon" />
                    <div>
                      { track['trackName'] }
                    </div>
                    <button className='collection-detail-delete' onClick={ this.onDeleteItem.bind(this, track['trackName']) }>
                      <img src={ `${IMAGE_URL}/icon_delete.svg` } alt="delete icon" />
                    </button>
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
