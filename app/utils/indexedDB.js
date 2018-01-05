/**
 * createIndexedDatabase  创建一个数据库
 * @param {string} name 数据库命
 * @param {number} version 版本号
 */
function createIndexedDatabase(name, version = 1) {
  return new Promise((resolve, reject) => {
    const indexDBConnect = window.indexedDB.open(name, version);
    indexDBConnect.addEventListener('success', (event) => {
      resolve(event.target.result);
    });

    indexDBConnect.addEventListener('error', (event) => {
      reject(event.target.error);
    });
  });
}

/**
 * isDataBasebeCreated 判断是否有指定的数据库
 * @param {string} name 数据库名
 */
function isDataBasebeCreated(name) {
  return new Promise((resolve, reject) => {
    const indexDBConnect = window.indexedDB.webkitGetDatabaseNames();
    indexDBConnect.addEventListener('success', (event) => {
      const list = Array.prototype.slice.call(event.target.result);
      const databaseName = list.find((dbName) => dbName === name);
      resolve(!!databaseName);
    });

    indexDBConnect.addEventListener('error', (event) => {
      reject(event.target.error);
    });
  });
}

/* eslint-disable */
/**
 * injectIndexedDB 将指定名称的数据库挂载到window对象上
 * @param {string} name 数据库名
 */
async function injectIndexedDB(name) {
  const __PIKACHU_NOTE_INDEXEDDB_DATABASE__ = await createIndexedDatabase(name);
  window.__PIKACHU_NOTE_INDEXEDDB_DATABASE__ = __PIKACHU_NOTE_INDEXEDDB_DATABASE__;
  __PIKACHU_NOTE_INDEXEDDB_DATABASE__.close();
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
function createIndexDBObjectStore(dbName, storeName, version = 2, keyOptions, index) {
  return new Promise((resolve, reject) => {
    const indexDBConnect = indexedDB.open(dbName, version);

    indexDBConnect.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        const store = db.createObjectStore(storeName, keyOptions);
        index.forEach((i) => store.createIndex(i.name, i.key, i.options));
        resolve(true);
      }
    };

    indexDBConnect.addEventListener('error', (event) => {
      reject(event.target.error);
    });
  });
}

export {
  createIndexedDatabase,
  injectIndexedDB,
  isDataBasebeCreated,
  createIndexDBObjectStore,
};
