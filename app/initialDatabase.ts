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
    type: 'CATALOG',
    createTime: new Date().getTime(),
    children: [
      { id: generateUUID(), title: '子目录', type: 'CATALOG', children: [], belong: MAIN_DIR_ID, createTime: new Date().getTime() },
      { id: generateUUID(), title: '子目录2', type: 'CATALOG', children: [], belong: MAIN_DIR_ID, createTime: new Date().getTime() }
    ],
  });
  await createIndexDBObjectStore(INITIAL_NOTES_STORE_PARAMS);
  await insertDataForSpecifiedStore(INDEXED_DATABASE_NAME, NOTES_STORE_NAME, {
    id: generateUUID(),
    belong: MAIN_DIR_ID,
    title: '默认笔记',
    type: 'NOTE',
    content: '<h1><strong>helloworld<span class="ql-cursor">﻿</span></strong></h1>',
    createTime: new Date().getTime(),
    lastUpdateTime: new Date().getTime(),
    tags: ['React', 'Electron'],
    class: '默认',
  });
  return true;
}

export default initialDatabase;
