import {
  INSERT_NOTE
} from '../common/constants';

const initialState = {
  dir: [
    {
      type: 0,
      id: 0,
      title: '主目录',
      children: [
        { type: 1, id: 'qwertdjlk-dadjak', title: 'Hello World!' },
      ],
    }
  ],
};

function reducer(state = initialState, action: any) {
  switch (action.type) {
    case INSERT_NOTE:
      console.log('?');
      return state;
    default:
      return state;
  }
}

export default reducer;
