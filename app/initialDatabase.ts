import { injectIndexedDB, createIndexDBObjectStore, insertDataForSpecifiedStore } from './api/indexdb';
import { INDEXED_DATABASE_NAME, INITIAL_DIR_STORE_PARAMS, TREE_DIRTORY_NAME } from './common/constants';
import generateUUID from './utils/guid';

async function initialDatabase() {
  await injectIndexedDB(INDEXED_DATABASE_NAME);
  await createIndexDBObjectStore(INITIAL_DIR_STORE_PARAMS);
  await insertDataForSpecifiedStore(INDEXED_DATABASE_NAME, TREE_DIRTORY_NAME, {
    id: generateUUID(),
    title: '主目录',
    children: [],
  });
  return true;
}

export default initialDatabase;
