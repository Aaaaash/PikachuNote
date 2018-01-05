export const FLODER_TYPE = 0;
export const NOTES_TYPE = 1;
export const INDEXED_DATABASE_NAME = '__PIKACHU_NOTE_INDEXEDDB_DATABASE__';
export const TREE_DIRTORY_NAME = 'dirs';
export const INITIAL_DIR_STORE_PARAMS = [
  INDEXED_DATABASE_NAME,
  TREE_DIRTORY_NAME,
  new Date().getTime(),
  { keyPath: 'id', autoIncrement: false },
  [
    { name: 'titleIndex', key: 'title', options: { unqiue: false, mulitEntry: false } }
  ]
];

export const INSERT_NOTE = 'app/treeView/INSERT_NOTE';
