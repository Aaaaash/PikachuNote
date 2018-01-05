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
async function injectIndexedDB(name) {
  const __PIKACHU_NOTE_INDEXEDDB_DATABASE__ = await createIndexedDatabase(name);
  window.__PIKACHU_NOTE_INDEXEDDB_DATABASE__ = __PIKACHU_NOTE_INDEXEDDB_DATABASE__;
}
/* eslint-enable */

export {
  createIndexedDatabase,
  injectIndexedDB,
  isDataBasebeCreated,
};
