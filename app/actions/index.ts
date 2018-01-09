import {
  INSERT_NOTE, FETCH_ALL_DIRS, FETCH_ALL_DIRS_COMPLETE,
} from '../constants';
import { Directory } from '../types';


export function insertNote(id: any, payload: any) {
  return {
    type: INSERT_NOTE,
    id,
    payload,
  };
}

export function fetchAllData(dbName: string, storeName: string) {
  return {
    type: FETCH_ALL_DIRS,
    dbName,
    storeName,
  };
}

export function fetchAllDataComplete(data: Directory[]) {
  return {
    type: FETCH_ALL_DIRS_COMPLETE,
    data,
  };
}
