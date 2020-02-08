import React, { Component, Fragment } from 'react';
import CollectionItemComponent from './CollectionItemComponent';
import CollectionDetailItemComponent from './CollectionDetailItemComponent';
import CheckBoxComponent from '../CheckBoxComponent';

export default class CollectionTableComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: 'This is search component!',
      isTableHidden: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onTableVisibilityChange = this.onTableVisibilityChange.bind(this);
  }

  onChange(event) {
    this.setState({
      searchText: event.target.value,
    });
  }

  onTableVisibilityChange(isTableHidden) {
    console.log("onTableVisibilityChange is called, isTableHidden is ", isTableHidden);
    this.setState({
      isTableHidden,
    });
  }

  render() {
    const { searchText, isTableHidden } = this.state;

    return (
      <div className='kartrider-collection-table-component'>
        <div className='collection-container'>
          <table className={ isTableHidden ? 'hidden' : 'show' } >
            <thead>
              <tr>
                <th className='collection-checkbox'>
                  <CheckBoxComponent />
                </th>
                <th>컬렉션 이름</th>
              </tr>
            </thead>
            <tbody>
              <CollectionItemComponent onClick={ this.onTableVisibilityChange } />
              <CollectionItemComponent
                onClick={ this.onTableVisibilityChange }
                name={ '형독 컬렉션! 글자가 엄청 길어질때는 이걸 어떻게 처리해주어야 할지 잘 모르겠는데?' } />
              <CollectionItemComponent onClick={ this.onTableVisibilityChange } />
              <CollectionItemComponent onClick={ this.onTableVisibilityChange } />
              <CollectionItemComponent onClick={ this.onTableVisibilityChange } />
              <CollectionItemComponent onClick={ this.onTableVisibilityChange } />
            </tbody>
          </table>
          <div className={ `detail-component ${ isTableHidden ? 'show' : 'hidden' }` }>
            <CollectionDetailItemComponent onClick={ this.onTableVisibilityChange } />
          </div>
        </div>
      </div>
    );
  }
}