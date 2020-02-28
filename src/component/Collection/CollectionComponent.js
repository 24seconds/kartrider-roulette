import React, { Component } from 'react';
import CollectionTableComponent from './CollectionTableComponent';

export default class CollectionComponent extends Component {
  render() {
    return (
      <div className='kartrider-collection-component'>
        <CollectionTableComponent />
      </div>
    );
  }
}