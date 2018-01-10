export const FLODER_TYPE = 0;
export const NOTES_TYPE = 1;
export const INDEXED_DATABASE_NAME = '__PIKACHU_NOTE_INDEXEDDB_DATABASE__';
export const TREE_DIRTORY_NAME = '__PIKACHU_NOTES_DIRECTORY_NAME__';
export const NOTES_STORE_NAME = '__PIKACHU_NOTES_STORE_NAME__';
export const CATALOG_TYPE = 'CATALOG';
export const NOTE_TYPE = 'NOTE';
export const INITIAL_DIR_STORE_PARAMS = {
  dbName: INDEXED_DATABASE_NAME,
  storeName: TREE_DIRTORY_NAME,
  version: new Date().getTime(),
  keyOptions: { keyPath: 'id', autoIncrement: false },
  index: [
    { name: 'titleIndex', key: 'title', options: { unqiue: false, mulitEntry: false } }
  ]
};

export const INITIAL_NOTES_STORE_PARAMS = {
  dbName: INDEXED_DATABASE_NAME,
  storeName: NOTES_STORE_NAME,
  version: new Date().getTime() + 1,
  keyOptions: { keyPath: 'id', autoIncrement: false },
  index: [
    { name: 'titleIndex', key: 'title', options: { unqiue: false, mulitEntry: false } }
  ]
}
