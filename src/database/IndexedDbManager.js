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

  async tryOpen() {
    if (this.db !== null) {
      return true;
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DATABASE_NAME, VERSION);
      request.onerror = event => {
        console.log("Why didn't you allow my web app to use IndexedDB?!");
        reject(event);
      };

      request.onsuccess = event => {
        console.log('open db!');
        const db = event.target.result;
        this.db = db;
        resolve(true);
      };
    })
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
      db.createObjectStore(OBJECT_STORE_COLLECTION, { keyPath: 'id', autoIncrement: true });
      
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

  async getAllColection() {
    await this.tryOpen();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([OBJECT_STORE_COLLECTION]);
      const objectStore = transaction.objectStore(OBJECT_STORE_COLLECTION);
      const request = objectStore.getAll();

      request.onerror = function(event) {
        // Handle errors!
        console.log("onerror, ", event);
        reject(event);
      };

      request.onsuccess = function(event) {
        resolve(event.target.result);
      };
    });
  }

  async getTrackList(keys) {
    await this.tryOpen();

    return new Promise((resolve, reject) => {
      const resultArray = [];

      const transaction = this.db.transaction([OBJECT_STORE_TRACK]);
      const objectStore = transaction.objectStore(OBJECT_STORE_TRACK);
      keys.forEach(key => {
        const request = objectStore.get(key);
        request.onsuccess = function(event) {
          resultArray.push(event.target.result);
        };
      });

      transaction.oncomplete = (event) => {
        resolve(resultArray);
      }

      transaction.onabort = (event) => {
        reject(event);
      }

      transaction.onerror = (event) => {
        reject(event);
      }
    });
  }
}

const idbManagerInstance = new IndexedDBManager();
export default idbManagerInstance;
