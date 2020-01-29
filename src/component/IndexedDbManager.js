const DATABASE_NAME = 'TEST_DATABASE';
const VERSION = 1;
const OBJECT_STORE_NAME = 'objectStoreTest1';
const OBJECT_STORE_COLLECTION = 'objectStoreDefaultCollection';

// This is what our customer data looks like.
const customerData = [
  { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
  { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" },
  { ssn: "666-66-6666", name: "Ding", age: 32, email: "donna@home.org" },
];

const defaultCollectionData = [
  { name: '2020 카트라이더 시즌 1', createdAt: 11, trackList: [1,2,3,5] },
  { name: '형독 컬렉션', createdAt: 22, trackList: [8,9,10,11] },
];


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
      const objectStore = db.createObjectStore(OBJECT_STORE_NAME, { autoIncrement: true });
      db.createObjectStore(OBJECT_STORE_COLLECTION, { autoIncrement: true });
      
      console.log('onupgradeneeded, objectStore is ', objectStore);

      objectStore.transaction.oncomplete = event => {
        const objectStoreName = db.transaction(OBJECT_STORE_NAME, 'readwrite').objectStore(OBJECT_STORE_NAME);
        customerData.forEach(customer => {
          objectStoreName.add(customer);
        });

        const objectStoreCollection = db.transaction(OBJECT_STORE_COLLECTION, 'readwrite').objectStore(OBJECT_STORE_COLLECTION);
        defaultCollectionData.forEach(customer => {
          objectStoreCollection.add(customer);
        });
      };
    };
  }
}

const idbManagerInstance = new IndexedDBManager();
export default idbManagerInstance;
