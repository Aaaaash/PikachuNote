import reducer from '../../app/reducers/sidebarReducer';
import * as actions from '../../app/actions';

describe('reducers', () => {
  describe('counter', () => {
    it('should handle initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual({
        dir: [],
        dirDetails: [],
        currentDir: '',
        active: '',
        currentNote: {},
      });
    })
  })
})