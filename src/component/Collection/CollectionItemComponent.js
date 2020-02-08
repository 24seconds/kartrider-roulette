import React, { Component } from 'react';
import { connect } from 'react-redux';
import iconTrack from '../../asset/icon_track.png';
import iconDelete from '../../asset/icon_delete.svg';
import iconArrowRight from '../../asset/icon_arrow_right.png';
import { openPopup } from '../../redux/action';
import CheckBoxComponent from '../CheckBoxComponent';


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
    this.props.onClick(true);
    console.log('onDetail');
  }

  render() {
    const { collectionName } = this.state;
    const { name } = this.props;

    return (
      <tr className='kartrider-collection-item-component'>
        <td>
          <CheckBoxComponent />
        </td>
        <td className='collection-data'>
          <div>
            <div className='collection-name'>
              { name ? name : collectionName }
            </div>
            <div className='collection-util'>
              <button className='collection-edit' onClick={ this.onEditItem } >
                <img src={ iconTrack } alt="track icon" />
              </button>
              <button className='collection-delete' onClick={ this.onDeleteItem }>
              <img src={ iconDelete } alt="delete icon" />
              </button>
              <button className='collection-detail' onClick={ this.onDetail }>
                <img src={ iconArrowRight } alt="detail icon" />
              </button>
            </div>
          </div>
        </td>
      </tr>
    );
  }
}

export default connect(null, { openPopup })(CollectionItemComponent);