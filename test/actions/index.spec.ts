import * as actions from '../../app/actions';

describe('actions', () => {
  it('should fetchAllData should create fetchAllData action', () => {
    expect(actions.fetchAllData('dbName', 'storeName'));
  });
});
