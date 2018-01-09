import { ActionsObservable, combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';

import { fetchAllDataByStoreName, getNotesByDirID } from './api/indexdb';
import { fetchAllDataComplete, fetchNotesByStoreID, fetchNotesByStroeIDSuc } from './actions';
import { Directory, ElectronAction, Note } from './types';
import { FETCH_ALL_DIRS, FETCH_DIRECTORY_NOTES } from './constants';

const fetchDirectoryEpic = (action$: ActionsObservable<ElectronAction>) => {
  return action$.ofType(FETCH_ALL_DIRS)
    .switchMap((action: ElectronAction) =>
      Observable.fromPromise(fetchAllDataByStoreName(action.dbName, action.storeName))
      .flatMap((response: Directory[]) =>
        Observable.concat(
          Observable.of(fetchAllDataComplete(response)),
          Observable.of(fetchNotesByStoreID(response[0]['id']))
        )
      )
    )
}

const fetchNotesByStoreIDEpic = (action$: ActionsObservable<ElectronAction>) => {
  return action$.ofType(FETCH_DIRECTORY_NOTES)
    .flatMap((action: ElectronAction) =>
      Observable.fromPromise(getNotesByDirID(action.storeID))
      .map((response: Note[]) => fetchNotesByStroeIDSuc(response))
    )
}

export default combineEpics(
  fetchDirectoryEpic,
  fetchNotesByStoreIDEpic
);
