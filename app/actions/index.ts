import {
  INSERT_NOTE, FETCH_ALL_DIRS,
  FETCH_ALL_DIRS_COMPLETE,
  FETCH_DIRECTORY_NOTES,
  FETCH_DIRECTORY_NOTES_COMPLETE,
  SET_CURRENT_DIRECTORY,
} from '../constants';
import { Directory, DirDetails } from '../types';


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

export function fetchNotesByStoreID(storeID: string) {
  return {
    type: FETCH_DIRECTORY_NOTES,
    storeID,
  };
}

export function fetchNotesByStroeIDSuc(data: DirDetails[]) {
  return {
    type: FETCH_DIRECTORY_NOTES_COMPLETE,
    data,
  };
}

export function setCurrentDir(id: string) {
  return {
    type: SET_CURRENT_DIRECTORY,
    id,
  };
}
