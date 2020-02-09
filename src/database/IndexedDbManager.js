import trackData from './track_data.json';
import collectionDefaultData from './collection_default_data.json';


const DATABASE_NAME = 'ROULETTE_DB';
const VERSION = 1;
const OBJECT_STORE_TRACK = 'track';
const OBJECT_STORE_COLLECTION = 'collection';


class IndexedDBManager {
  constructor() {
    this.db = null;
    this.open();
  }

  open() {
    const request = indexedDB.open(DATABASE_NAME, VERSION);
    request.onerror = event => {
      console.log("Why didn't you allow my web app to use IndexedDB?!");
    };

    request.onsuccess = event => {
      console.log('open db!');
      const db = event.target.result;
      this.db = db;
    };

    request.onupgradeneeded = event => {
      const db = event.target.result;
      const objectStore = db.createObjectStore(OBJECT_STORE_TRACK, { keyPath: 'trackName' });
      db.createObjectStore(OBJECT_STORE_COLLECTION, { autoIncrement: true });
      
      console.log('onupgradeneeded, objectStore is ', objectStore);

      objectStore.createIndex(`index_${OBJECT_STORE_TRACK}_theme`, 'theme', { unique: false });
      objectStore.createIndex(`index_${OBJECT_STORE_TRACK}_trackType`, 'trackType', { unique: false });

      objectStore.transaction.oncomplete = event => {
        const trackObjectStore = db.transaction([OBJECT_STORE_TRACK], 'readwrite').objectStore(OBJECT_STORE_TRACK);
        trackData.forEach((track, index) => {
          const r = trackObjectStore.add(track);
        });

        const objectStoreCollection = db.transaction(OBJECT_STORE_COLLECTION, 'readwrite').objectStore(OBJECT_STORE_COLLECTION);
        collectionDefaultData.forEach(collection => {
          objectStoreCollection.add(collection);
        });
      };
    };
  }
}

const idbManagerInstance = new IndexedDBManager();
export default idbManagerInstance;
