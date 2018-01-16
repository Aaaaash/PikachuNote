import reducer from '../../app/reducers/sidebarReducer';
import * as actions from '../../app/actions';
import { Directory } from '../../app/types';

const MOCK_INITIAL_STATE = {
  dir: [],
  dirDetails: [],
  currentDir: '',
  active: '',
  currentNote: {},
};

const MOCK_DIRECTORY_LIST: Array<Directory> = [
  {
    id: 'aaa',
    title: 'test',
    children: [],
    belong: 'xxx',
    type: 'NOTE',
    createTime: Number(new Date()) / 1000,
    lastUpdateTime: Number(new Date()) / 1000,
    tags: ['jest', 'ts'],
  }
];

describe('reducers', () => {
  describe('initial State', () => {
    it('should handle initial state', () => {
      expect(reducer(MOCK_INITIAL_STATE, { type: 'unknown' })).toEqual(MOCK_INITIAL_STATE);
    });
    it('should handle FETCH_ALL_DIRS_COMPLETE action', () => {
      expect(reducer(MOCK_INITIAL_STATE, actions.fetchAllDataComplete(MOCK_DIRECTORY_LIST))).toEqual({
        ...MOCK_INITIAL_STATE,
        dir: MOCK_DIRECTORY_LIST,
      });
    })
  });
});
