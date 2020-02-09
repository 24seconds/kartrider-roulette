import React, { Component } from 'react';
import { IMAGE_URL } from '../../redux/store';
import IndexedDbManager from '../../database/IndexedDbManager';

export default class CollectionDetailItemComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trackList: [],
    }

    this.onClick = this.onClick.bind(this);
    this.onBack = this.onBack.bind(this);
  }

  onClick() {
    this.props.onClick(false, null);
  }

  onBack() {

  }

  render() {
    const { trackList } = this.props;

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
            trackList.map(track => {
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
          }
        </div>
      </div>
    )
  }
}

CollectionDetailItemComponent.defaultProps = {
  "trackList": [],
};
