import { injectIndexedDB, createIndexDBObjectStore, insertDataForSpecifiedStore } from './api/indexdb';
import { INDEXED_DATABASE_NAME, INITIAL_NOTES_STORE_PARAMS, NOTES_STORE_NAME, INITIAL_DIR_STORE_PARAMS, TREE_DIRTORY_NAME } from './common/constants';
import generateUUID from './utils/guid';

async function initialDatabase() {
  const MAIN_DIR_ID = generateUUID();
  await injectIndexedDB(INDEXED_DATABASE_NAME);
  await createIndexDBObjectStore(INITIAL_DIR_STORE_PARAMS);
  await insertDataForSpecifiedStore(INDEXED_DATABASE_NAME, TREE_DIRTORY_NAME, {
    id: MAIN_DIR_ID,
    title: '主目录',
    children: [
      { id: generateUUID(), title: '子目录', children: [], belong: MAIN_DIR_ID },
      { id: generateUUID(), title: '子目录2', children: [], belong: MAIN_DIR_ID }
    ],
  });
  await createIndexDBObjectStore(INITIAL_NOTES_STORE_PARAMS);
  await insertDataForSpecifiedStore(INDEXED_DATABASE_NAME, NOTES_STORE_NAME, {
    id: generateUUID(),
    belong: MAIN_DIR_ID,
    title: '皮卡丘笔记本',
    content: 'Hello World',
    createTime: new Date().getTime() / 1000,
    lastUpdateTime: new Date().getTime() / 1000,
    tags: [],
    class: '默认',
  });
  return true;
}

export default initialDatabase;
