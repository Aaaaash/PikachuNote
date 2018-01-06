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
function createDatabaseByName(name: string, version: number = 1): Promise<IDBDatabase> {
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
  const __PIKACHU_NOTE_INDEXEDDB_DATABASE__ = await createDatabaseByName(name);
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

export {
  createDatabaseByName,
  injectIndexedDB,
  isDataBasebeCreated,
  createIndexDBObjectStore,
  deleteDatabaseByName,
};
