import React, { Component } from 'react';
import { connect } from 'react-redux';
import CollectionItemComponent from './CollectionItemComponent';
import CollectionDetailItemComponent from './CollectionDetailItemComponent';
import CheckBoxComponent from '../CheckBoxComponent';
import IndexedDbManager from '../../database/IndexedDbManager';
import {
  addRouletteSet,
  deleteRouletteSet,
  deleteAllRouletteSet,
} from '../../redux/action';

class CollectionTableComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: 'This is search component!',
      isTableHidden: false,
      isAllChecked: false,
      collectionObject: {},
      collectionCheckedObject: {},
      selectedCollection: {
        collectionId: -1,
        trackList: {},
      }
    };

    this.onChange = this.onChange.bind(this);
    this.onDetail = this.onDetail.bind(this);
    this.onCreateCollection = this.onCreateCollection.bind(this);
    this.onDeleteCollection = this.onDeleteCollection.bind(this);
    this.onDeleteTrack = this.onDeleteTrack.bind(this);
    this.onSelectCollection = this.onSelectCollection.bind(this);
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

  async onDeleteTrack(collectionId, trackName) {
    const { collectionObject } = this.state;
    const collection = collectionObject[collectionId];

    const oldTrackList = collection['trackList'];
    const newTrackList = collection['trackList'].filter(name => name !== trackName);

    this.props.dispatch(deleteRouletteSet(oldTrackList));
    this.props.dispatch(addRouletteSet(newTrackList));

    const updatedCollection = {
      ...collection,
      trackList: newTrackList,
    };

    await IndexedDbManager.updateCollection(updatedCollection);
    await this.getAllColection();
    await this.syncSelectedCollection(collectionId);
  }

  async syncSelectedCollection(selectedCollectionId = null) {
    const { collectionObject } = this.state;

    const selectedCollection = await (async () => {
      const collection = collectionObject[selectedCollectionId];
      if (collection) {
        const trackList = await IndexedDbManager.getTrackList(collection['trackList']);

        const object = trackList.reduce((acc, track) => {
          acc[track['theme']] = acc[track['theme']] || [];
          acc[track['theme']] = [...acc[track['theme']], track];

          return acc;
        }, {});

        return {
          collectionId: collection['id'],
          trackList: object,
        };
      } else {
        return null;
      }
    })();

    if (selectedCollection) {
      this.setState({ selectedCollection });
    }
  }

  async onDetail(isTableHidden, selectedCollectionId = null) {
    await this.syncSelectedCollection(selectedCollectionId);

    this.setState({ isTableHidden });
  }

  async onCreateCollection() {
    await IndexedDbManager.createCollection();
    await this.getAllColection();
  }

  onSelectCollection(isChecked, collectionId = 'all') {
    const { collectionCheckedObject, collectionObject } = this.state;
    const nextCollectionCheckedObject = { ...collectionCheckedObject };

    if (collectionId === 'all') {
      // select all!
      Object.keys(collectionObject).forEach(collectionId => {
        nextCollectionCheckedObject[collectionId] = isChecked;
      });

      if (isChecked) {
        const collectionTrackList = ((collectionObject) => {
           const trackSet = new Set();

           Object.values(collectionObject).forEach(collection => {
             collection['trackList'].forEach(track => {
               trackSet.add(track);
             });
           });

           return [...trackSet];
        })(collectionObject);

        this.props.dispatch(deleteAllRouletteSet());
        this.props.dispatch(addRouletteSet(collectionTrackList));
      } else {
        this.props.dispatch(deleteAllRouletteSet());
      }

      this.setState({
        isAllChecked: isChecked,
        collectionCheckedObject: nextCollectionCheckedObject
      });

      return;
    } else {
      nextCollectionCheckedObject[collectionId] = isChecked;
      this.setState({
        collectionCheckedObject: nextCollectionCheckedObject
      });
    }
  }

  render() {
    const {
      isTableHidden,
      isAllChecked,
      collectionObject,
      selectedCollection,
      collectionCheckedObject
    } = this.state;

    return (
      <div className='kartrider-collection-table-component'>
        <div className='collection-container'>
          <div className={ `collection-list ` + (isTableHidden ? 'hidden' : 'show') } >
            <div className='collection-list-header'>
              <div className='collection-checkbox'>
                <CheckBoxComponent
                  isChecked={ isAllChecked }
                  onClick={ this.onSelectCollection } />
              </div>
              <div className='collection-header-title'>
                <div className='header-text'>
                  컬렉션 이름
                </div>
                <div className='collection-util'>
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
                      onCheck={ this.onSelectCollection }
                      syncCollection={ this.getAllColection }
                      key={ `key-${collection.id}` }
                      collection={ collection }
                      isChecked={ !!collectionCheckedObject[collection['id']] }/>
                  );
                })
              }
            </div>
          </div>
          <div className={ `detail-component ${ isTableHidden ? 'show' : 'hidden' }` }>
            <CollectionDetailItemComponent
              collectionId={ selectedCollection['collectionId'] }
              trackList={ selectedCollection['trackList'] }
              onClick={ this.onDetail }
              onDelete={ this.onDeleteTrack } />
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(CollectionTableComponent);
