export const FLODER_TYPE = 0;
export const NOTES_TYPE = 1;
export const INDEXED_DATABASE_NAME = '__PIKACHU_NOTE_INDEXEDDB_DATABASE__';
export const TREE_DIRTORY_NAME = 'dirs';
export const INITIAL_DIR_STORE_PARAMS = {
  dbName: INDEXED_DATABASE_NAME,
  storeName: TREE_DIRTORY_NAME,
  version: new Date().getTime(),
  keyOptions: { keyPath: 'id', autoIncrement: false },
  index: [
    { name: 'titleIndex', key: 'title', options: { unqiue: false, mulitEntry: false } }
  ]
};

export interface Directory {
  id: string;
  title: string;
  children: Directory[];
}

export interface ElectronAction {
  type: string;
  [propName: string]: any;
};
