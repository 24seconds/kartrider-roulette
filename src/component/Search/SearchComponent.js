import React, { Component } from 'react';

export default class SearchComponent extends Component {
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
      <div>
        <input type='text' value={ searchText } onChange={ this.onChange }/>
      </div>
    );
  }
}