import React, { Component } from 'react';
import { IMAGE_URL } from '../../redux/store';
import IndexedDbManager from '../../database/IndexedDbManager';

export default class CollectionDetailItemComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trackList: [],
      themeList: [],
    }

    this.onClick = this.onClick.bind(this);
    this.onBack = this.onBack.bind(this);
  }

  onClick() {
    this.props.onClick(false, null);
  }

  onBack() {

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
      <div className='kartrider-collection-detail-item-component' onClick={ this.onClick }>
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
                    <button className='collection-detail-delete' onClick={ this.onDeleteItem }>
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
  "trackList": [],
};
