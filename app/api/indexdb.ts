import { Directory, DirDetails } from '../types';
import {
  INDEXED_DATABASE_NAME,
  NOTES_STORE_NAME,
} from '../common/constants';

interface ElectronWindow {
  [propName: string]: any;
}

interface IndexDB {
  [propName: string]: any;
}

interface CreateParams {
  dbName: string;
  storeName: string;
  version: number;
  keyOptions: object;
  index: Array<object>;
}

/**
 * createDatabaseByName  创建一个数据库
 * @param {string} name 数据库命
 * @param {number} version 版本号
 */
function createDatabaseByName(name: string, version?: number): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const indexDBConnect: IDBOpenDBRequest = window.indexedDB.open(name, version);
    indexDBConnect.addEventListener('success', (event: any) => {
      const db: IDBDatabase = event.target.result;
      resolve(db);
    });

    indexDBConnect.addEventListener('error', (event: any) => {
      reject(event.target.error);
    });
  });
}

/**
 * isDataBasebeCreated 判断是否有指定的数据库
 * @param {string} name 数据库名
 */
function isDataBasebeCreated(name: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const indexDBConnect: IDBRequest = (window.indexedDB as IndexDB).webkitGetDatabaseNames();
    indexDBConnect.addEventListener('success', (event: any) => {
      const list = Array.prototype.slice.call(event.target.result);
      const databaseName = list.find((dbName: string) => dbName === name);
      resolve(!!databaseName);
    });

    indexDBConnect.addEventListener('error', (event: any) => {
      reject(event.target.error);
    });
  });
}

/* eslint-disable */
/**
 * injectIndexedDB 将指定名称的数据库挂载到window对象上
 * @param {string} name 数据库名
 */
async function injectIndexedDB(name: string): Promise<void> {
  const __PIKACHU_NOTE_INDEXEDDB_DATABASE__ = await createDatabaseByName(name, 1);
  (window as ElectronWindow).__PIKACHU_NOTE_INDEXEDDB_DATABASE__ = __PIKACHU_NOTE_INDEXEDDB_DATABASE__;
  (__PIKACHU_NOTE_INDEXEDDB_DATABASE__ as IDBDatabase).close();
}
/* eslint-enable */

/**
 * createIndexDBObjectStore 创建数据库store对象
 * @param {string} dbName 数据库名
 * @param {string} storeName store名
 * @param {number} version 数据库版本号
 * @param {object} keyOptions 主键设置
 * @param {array} index 索引
 */
function createIndexDBObjectStore({ dbName, storeName, version = 2, keyOptions, index }: CreateParams): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const indexDBConnect: IDBOpenDBRequest = indexedDB.open(dbName, version);

    indexDBConnect.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        const store = db.createObjectStore(storeName, keyOptions);
        index.forEach((i: any) => store.createIndex(i.name, i.key, i.options));
        db.close();
        resolve(true);
      }
    };

    indexDBConnect.addEventListener('error', (event) => {
      reject(event.target);
    });
  });
}

/**
 * deleteDatabaseByName 根据指定名称删除数据库
 * @param {string} name 数据库名
 */
function deleteDatabaseByName(name: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const indexDBConnect: IDBRequest = indexedDB.deleteDatabase(name);
    indexDBConnect.addEventListener('success', () => {
      resolve(true);
    });

    indexDBConnect.addEventListener('error', (event) => {
      reject(event.target);
    });
  });
}

/**
 * getDataById 根据id获取数据
 * @param dbName 数据库名
 * @param storeName store名
 * @param id 唯一id
 */
function getDataById(dbName: string, storeName: string, id: string) {
  return new Promise((resolve, reject) => {
    createDatabaseByName(dbName)
      .then((db: IDBDatabase) => {
        const tx: IDBTransaction = db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const range = IDBKeyRange.only(id);

        const storeConnect = store.openCursor(range);

        let data: any;
        storeConnect.addEventListener('success', (event: any) => {
          const cursor = event.target.result;
          if (cursor) {
            data = cursor.value;
            cursor.continue();
          }
        });

        tx.addEventListener('complete', () => {
          db.close();
          resolve(data);
        });
      });
  });
}

function getNotesByStoreID(id: string): Promise<DirDetails[]> {
  return new Promise((resolve, reject) => {
    createDatabaseByName(INDEXED_DATABASE_NAME)
      .then((db: IDBDatabase) => {
        const tx: IDBTransaction = db.transaction(NOTES_STORE_NAME, 'readonly');
        const store = tx.objectStore(NOTES_STORE_NAME);

        let allData: DirDetails[] = [];
        const storeConnect = store.openCursor();
        storeConnect.addEventListener('success', (event: any) => {
          const cursor = event.target.result;
          if (cursor) {
            const note: DirDetails = cursor.value;
            if (note.belong === id) {
              allData.push(cursor.value);
              cursor.continue();
            }
          }
        });
        tx.addEventListener('complete', () => {
          db.close();
          resolve(allData);
        });
      });
  });
}
/**
 * insertDataForSpecifiedStore 插入数据到指定store中
 * @param dbName 数据库名
 * @param storeName store名
 * @param data 数据
 */
function insertDataForSpecifiedStore(dbName: string, storeName: string, data: any) {
  return new Promise((resolve, reject) => {
    createDatabaseByName(dbName)
      .then((db: IDBDatabase) => {
        const tx: IDBTransaction = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const insertDataConnect: IDBRequest = store.add(data);

        let result: any;
        insertDataConnect.addEventListener('success', (event: any) => {
          result = event.target.result;
        });

        tx.addEventListener('complete', () => {
          db.close();
          resolve(result);
        });
      });
  });
}

/**
 * fetchAllDataByStoreName 根据store名获取所有数据
 * @param dbName 数据库名
 * @param storeName store名
 */
function fetchAllDataByStoreName(dbName: string, storeName: string) {
  return new Promise((resolve, reject) => {
    createDatabaseByName(dbName)
      .then((db: IDBDatabase) => {
        const tx: IDBTransaction = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        
        let allData: Directory[] = [];
        const storeConnect = store.openCursor();

        storeConnect.addEventListener('success', (event: any) => {
          const cursor = event.target.result;
          if (cursor) {
            allData.push(cursor.value);
            cursor.continue();
          }
        });

        tx.addEventListener('complete', (event: any) => {
          db.close();
          resolve(allData);
        });
      });
  });
}

export {
  createDatabaseByName,
  injectIndexedDB,
  isDataBasebeCreated,
  createIndexDBObjectStore,
  deleteDatabaseByName,
  getDataById,
  insertDataForSpecifiedStore,
  fetchAllDataByStoreName,
  getNotesByStoreID,
};
