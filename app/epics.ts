import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs';
import 'rxjs';

import { fetchAllDataByStoreName } from './utils/indexedDB';
import { fetchAllDataComplete } from './actions';
import { Directory, ElectronAction } from './common/constants';
import { FETCH_ALL_DIRS } from './constants';

const fetchDirectory = (action$: ActionsObservable<ElectronAction>) => {
  return action$.ofType(FETCH_ALL_DIRS)
    .mergeMap((action: ElectronAction) =>
      Observable.fromPromise(fetchAllDataByStoreName(action.dbName, action.storeName))
      .map((response: Directory[]) => fetchAllDataComplete(response))
    );
}

export {
  fetchDirectory,
};
