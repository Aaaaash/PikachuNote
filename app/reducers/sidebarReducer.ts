import {
  INSERT_NOTE, FETCH_ALL_DIRS_COMPLETE
} from '../constants';

const initialState = {
  dir: [],
};

function reducer(state = initialState, action: any) {
  switch (action.type) {
    case INSERT_NOTE:
      console.log('?');
      return state;
    case FETCH_ALL_DIRS_COMPLETE:
      return { ...state, dir: action.data };
    default:
      return state;
  }
}

export default reducer;
