import React, { Component } from 'react';
import CheckBoxComponent from '../CheckBoxComponent';
import { IMAGE_URL } from '../../redux/store';
import { connect } from 'react-redux';
import TrackPopupComponent from '../TrackPopup/TrackPopupComponent';
import { UPDATE_COLLECTION } from '../../database/constant';
import IndexedDbManager from '../../database/IndexedDbManager';
import { addRouletteSet, deleteRouletteSet } from '../../redux/action';


class CollectionItemComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collectionName: '형독 컬렉션!',
    };

    this.onEditItem = this.onEditItem.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
    this.onDetail = this.onDetail.bind(this);
    this.onSelectCollection = this.onSelectCollection.bind(this);
  }

  async onEditItem() {
    const { collection, syncCollection, isChecked } = this.props;

    const result = await TrackPopupComponent.open({
      collection,
    });

    if (result['action'] === UPDATE_COLLECTION) {
      const updatedCollection = result['payload'];

      if (isChecked) {
        this.props.dispatch(deleteRouletteSet(collection['trackList']));
        this.props.dispatch(addRouletteSet(updatedCollection['trackList']));
      }

      await IndexedDbManager.updateCollection(updatedCollection);
      await syncCollection();
    }
  }

  onSelectCollection(isChecked) {
    const { collection, onCheck } = this.props;

    if (isChecked) {
      this.props.dispatch(addRouletteSet(collection['trackList']));
    } else {
      this.props.dispatch(deleteRouletteSet(collection['trackList']));
    }

    if (onCheck) {
      onCheck(isChecked, collection['id']);
    }
  }

  onDeleteItem() {
    const { collection, onDelete, isChecked } = this.props;

    if (isChecked) {
      this.props.dispatch(deleteRouletteSet(collection['trackList']));
    }

    onDelete(collection);
  }

  onDetail() {
    const { collection } = this.props;
    this.props.onClick(true, collection['id']);
    console.log('onDetail');
  }

  render() {
    const { collection, isChecked } = this.props;
    const { collectionName } = this.state;

    return (
      <div className='kartrider-collection-item-component'>
        <div className='collection-item-checkbox'>
          <CheckBoxComponent
            isChecked={ isChecked }
            onClick={ this.onSelectCollection } />
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

export default connect()(CollectionItemComponent);
