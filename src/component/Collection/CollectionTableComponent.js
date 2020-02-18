import React, { Component, Fragment } from 'react';
import CollectionItemComponent from './CollectionItemComponent';
import CollectionDetailItemComponent from './CollectionDetailItemComponent';
import CheckBoxComponent from '../CheckBoxComponent';
import IndexedDbManager from '../../database/IndexedDbManager';

export default class CollectionTableComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: 'This is search component!',
      isTableHidden: false,
      collectionObject: {},
      selectedTrackList: [],
    };

    this.onChange = this.onChange.bind(this);
    this.onDetail = this.onDetail.bind(this);
    this.onCreateCollection = this.onCreateCollection.bind(this);
    this.onDeleteCollection = this.onDeleteCollection.bind(this);
    this.getAllColection = this.getAllColection.bind(this);
  }

  async componentDidMount() {
    await this.getAllColection();
  }

  async getAllColection() {
    const collectionList = await IndexedDbManager.getAllColection();
    const collectionObject = {};

    collectionList.forEach(collection => {
      collectionObject[collection.id] = collection;
    });

    this.setState({
      collectionObject,
    });
  }

  onChange(event) {
    this.setState({
      searchText: event.target.value,
    });
  }

  async onDeleteCollection(collection) {
    await IndexedDbManager.deleteCollection(collection['id']);
    await this.getAllColection();
  }

  async onDetail(isTableHidden, selectedCollectionId = null) {
    console.log("onTableVisibilityChange is called, isTableHidden is ", isTableHidden);
    const { collectionObject } = this.state;
    const stateToUpdate = {
      isTableHidden,
    };

    await (async () => {
      const collection = collectionObject[selectedCollectionId];
      if (collection) {
        const trackList = await IndexedDbManager.getTrackList(collection['trackList']);
        stateToUpdate['selectedTrackList'] = trackList;
      }
    })();

    this.setState(stateToUpdate);
  }

  async onCreateCollection() {
    await IndexedDbManager.createCollection();
    await this.getAllColection();
  }

  render() {
    const {
      isTableHidden, collectionObject, selectedTrackList
    } = this.state;

    return (
      <div className='kartrider-collection-table-component'>
        <div className='collection-container'>
          <div className={ `collection-list ` + (isTableHidden ? 'hidden' : 'show') } >
            <div className='collection-list-header'>
              <div className='collection-checkbox'>
                <CheckBoxComponent />
              </div>
              <div className='collection-header-title'>
                <div className='header-text'>
                  컬렉션 이름
                </div>
                <div className='collection-util'>
                  <button> 제거 </button>
                  <button onClick={ this.onCreateCollection }>
                    추가
                  </button>
                </div>
              </div>
            </div>
            <div className='collection-list-body'>
              {/* <CollectionItemComponent onClick={ this.onTableVisibilityChange } />
              <CollectionItemComponent
                onClick={ this.onTableVisibilityChange }
                name={ '형독 컬렉션! 글자가 엄청 길어질때는 이걸 어떻게 처리해주어야 할지 잘 모르겠는데?' } />
              <CollectionItemComponent onClick={ this.onTableVisibilityChange } />
              <CollectionItemComponent onClick={ this.onTableVisibilityChange } />
              <CollectionItemComponent onClick={ this.onTableVisibilityChange } />
              <CollectionItemComponent onClick={ this.onTableVisibilityChange } /> */}
              {
                Object.values(collectionObject).map(collection => {
                  return (
                    <CollectionItemComponent
                      onClick={ this.onDetail }
                      onDelete={ this.onDeleteCollection }
                      syncCollection={ this.getAllColection }
                      key= { `key-${collection.id}` }
                      collection={ collection }/>
                  );
                })
              }
            </div>
          </div>
          <div className={ `detail-component ${ isTableHidden ? 'show' : 'hidden' }` }>
            <CollectionDetailItemComponent
              trackList={ selectedTrackList }
              onClick={ this.onDetail } />
          </div>
        </div>
      </div>
    );
  }
}
