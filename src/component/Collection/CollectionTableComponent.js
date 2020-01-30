import React, { Component } from 'react';
import CollectionItemComponent from './CollectionItemComponent';

export default class CollectionTableComponent extends Component {
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
      <div className='kartrider-collection-table-component'>
        <table>
          <thead>
            <tr>
              <th className='collection-checkbox'>
                <input type="checkbox"/>
              </th>
              <th>컬렉션 이름</th>
            </tr>
          </thead>
          <tbody>
            <CollectionItemComponent />
            <CollectionItemComponent name={ '형독 컬렉션! 글자가 엄청 길어질때는 이걸 어떻게 처리해주어야 할지 잘 모르겠는데?' } />
            <CollectionItemComponent />
            <CollectionItemComponent />
            <CollectionItemComponent />
            <CollectionItemComponent />
          </tbody>
        </table>
      </div>
    );
  }
}