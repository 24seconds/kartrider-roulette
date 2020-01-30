import React, { Component } from 'react';
import CollectionTableComponent from './CollectionTableComponent';

export default class CollectionComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: 'This is search component!',
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({
      searchText: event.target.value,
    });
  }

  render() {
    const { searchText } = this.state;

    return (
      <div className='kartrider-collection-component'>
        <div>
          <p> Collection </p>
          <button> 삭제 </button>
        </div>
        <CollectionTableComponent />
      </div>
    );
  }
}