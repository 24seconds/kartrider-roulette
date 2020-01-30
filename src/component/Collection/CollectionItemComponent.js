import React, { Component } from 'react';

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

  onEditItem() {
    console.log('onEditItem');
  }

  onDeleteItem() {
    console.log('onDeleteItem');
  }

  onDetail() {
    console.log('onDetail');
  }

  render() {
    const { collectionName } = this.state;
    const { name } = this.props;

    return (
      <tr className='kartrider-collection-item-component'>
        <td>
          <input type="checkbox"/>
        </td>
        <td className='collection-data'>
          <div>
            <div className='collection-name'>{ name ? name : collectionName }</div>
            <div className='collection-util'>
              <button onClick={ this.onEditItem } > 트랙 </button>
              <button onClick={ this.onDeleteItem } > 삭제 </button>
              <button onClick={ this.onDetail } > -> </button>
            </div>
          </div>
        </td>
      </tr>
    );
  }
}