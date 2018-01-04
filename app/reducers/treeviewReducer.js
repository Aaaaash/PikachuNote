import {
  INSERT_NOTE
} from '../common/constants';

const initialState = {
  dir: [
    {
      type: 0,
      id: 0,
      title: '主目录',
      children: [],
    }
  ],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case INSERT_NOTE:
      console.log('?');
      return state;
    default:
      return state;
  }
}

export default reducer;
