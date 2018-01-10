import {
  FETCH_ALL_DIRS_COMPLETE,
  FETCH_DIRECTORY_NOTES_COMPLETE,
  SET_CURRENT_DIRECTORY,
} from '../constants';

const initialState = {
  dir: [],
  dirDetails: [],
  currentDir: '',
};

function reducer(state = initialState, action: any) {
  switch (action.type) {
    case FETCH_ALL_DIRS_COMPLETE:
      return { ...state, dir: action.data };
    case FETCH_DIRECTORY_NOTES_COMPLETE:
      console.log(action.data);
      return { ...state, dirDetails: action.data };
    case SET_CURRENT_DIRECTORY:
      return { ...state, currentDir: action.storeID };
    default:
      return state;
  }
}

export default reducer;
