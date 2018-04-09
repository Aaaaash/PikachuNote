import { Store } from 'ractor';

import SetCurrentDir from '../message/SetCurrentDir';
import SetActiveItem from '../message/SetActiveItem';

export default class SideStore extends Store<{}> {

  public createReceive() {
    return this.receiveBuilder()
      .matchArray([SetActiveItem, SetCurrentDir], (val) => {
        // todo
      })
      .build();
  }
}
