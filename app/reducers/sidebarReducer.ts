import {
  FETCH_ALL_DIRS_COMPLETE,
  FETCH_DIRECTORY_NOTES_COMPLETE,
  SET_CURRENT_DIRECTORY,
  SET_ACTIVE_ITEM,
} from '../constants';
import { ElectronAction } from '../types';

const initialState = {
  dir: [],
  dirDetails: [],
  currentDir: '',
  active: '',
  currentNote: {},
};

function reducer(state = initialState, action: ElectronAction) {
  switch (action.type) {
    case FETCH_ALL_DIRS_COMPLETE:
      return { ...state, dir: action.data };
    case FETCH_DIRECTORY_NOTES_COMPLETE:
      return { ...state, dirDetails: action.data };
    case SET_CURRENT_DIRECTORY:
      return { ...state, currentDir: action.storeID };
    case SET_ACTIVE_ITEM:
      const currentNote = state.dirDetails.find((v: any) => v.id === action.id && v.type === 'NOTE');
      return { ...state, active: action.id, currentNote: currentNote ? currentNote : {} };
    default:
      return state;
  }
}

export default reducer;
