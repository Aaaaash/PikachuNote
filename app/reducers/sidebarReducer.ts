import {
  FETCH_ALL_DIRS_COMPLETE,
  FETCH_DIRECTORY_NOTES_COMPLETE,
} from '../constants';

const initialState = {
  dir: [],
  dirDetails: [],
};

function reducer(state = initialState, action: any) {
  switch (action.type) {
    case FETCH_ALL_DIRS_COMPLETE:
      return { ...state, dir: action.data };
    case FETCH_DIRECTORY_NOTES_COMPLETE:
      return { ...state, dirDetails: action.data };
    default:
      return state;
  }
}

export default reducer;
