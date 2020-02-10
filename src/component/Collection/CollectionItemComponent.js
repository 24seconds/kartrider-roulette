import React, { Component } from 'react';
import CheckBoxComponent from '../CheckBoxComponent';
import { IMAGE_URL } from '../../redux/store';
import TrackPopupComponent from '../TrackPopup/TrackPopupComponent';


export default class CollectionItemComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collectionName: '형독 컬렉션!',
      // objectStoreData should be used
    };

    this.onEditItem = this.onEditItem.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
    this.onDetail = this.onDetail.bind(this);
  }

  async onEditItem() {
    const { collection } = this.props;

    const result = await TrackPopupComponent.open({
      collection,
    });
  }

  onDeleteItem() {
    console.log('onDeleteItem');
  }

  onDetail() {
    const { collection } = this.props;
    this.props.onClick(true, collection['id']);
    console.log('onDetail');
  }

  render() {
    const { collectionName } = this.state;
    const { collection } = this.props;

    return (
      <div className='kartrider-collection-item-component'>
        <div className='collection-item-checkbox'>
          <CheckBoxComponent />
        </div>
        <div className='collection-data'>
          <div>
            <div className='collection-name'>
              { collection ? collection['name'] : collectionName }
            </div>
            <div className='collection-util'>
              <button className='collection-edit' onClick={ this.onEditItem } >
                <img src={ `${IMAGE_URL}/icon_track.png` } alt="track icon" />
              </button>
              <button className='collection-delete' onClick={ this.onDeleteItem }>
              <img src={ `${IMAGE_URL}/icon_delete.svg` } alt="delete icon" />
              </button>
              <button className='collection-detail' onClick={ this.onDetail }>
                <img src={ `${IMAGE_URL}/icon_arrow_right.png` } alt="detail icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
