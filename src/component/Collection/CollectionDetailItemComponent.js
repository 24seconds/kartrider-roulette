import React, { Component } from 'react';

export default class CollectionDetailItemComponent extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onClick(false);
  }

  render() {
    return (
      <div className='kartrider-collection-detail-item-component' onClick={ this.onClick }>
        Detail here!!!
      </div>
    )
  }
}