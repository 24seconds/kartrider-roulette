import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openPopup } from '../../redux/action';
import CheckBoxComponent from '../CheckBoxComponent';
import { IMAGE_URL } from '../../redux/store';


class CollectionItemComponent extends Component {
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

  onEditItem() {
    console.log('onEditItem');
    this.props.openPopup();
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
      <tr className='kartrider-collection-item-component'>
        <td>
          <CheckBoxComponent />
        </td>
        <td className='collection-data'>
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
        </td>
      </tr>
    );
  }
}

export default connect(null, { openPopup })(CollectionItemComponent);