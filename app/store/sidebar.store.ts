import { Store } from 'ractor';

import FetchDirectory from '../message/FetchDirectory';
import SetCurrentDir from '../message/SetCurrentDir';
import SetActiveItem from '../message/SetActiveItem';
import InsertNewNote from '../message/InsertNewNote';
import { fetchAllDataByStoreName, getNotesByDirID, insertDataForSpecifiedStore } from '../api/indexdb';
import { StoreState } from '../types';

export default class SideBarStore extends Store<{}> {
  public state: StoreState = {
    dir: [],
    currentDir: '',
    dirDetails: [],
    active: '',
    currentNote: {},
  }

  public createReceive() {
    return this.receiveBuilder()
      .match(FetchDirectory, async (fetchDirectory: FetchDirectory) => {
        const dir = await fetchAllDataByStoreName(fetchDirectory.dbName, fetchDirectory.storeName);
        this.setState({ dir });
        this.context.system.dispatch(new SetCurrentDir(dir[0]['id']));
      })
      .match(SetCurrentDir, async (setCurrentDir: SetCurrentDir) => {
        this.setState({ currentDir: setCurrentDir.id });
        const notes = await getNotesByDirID(setCurrentDir.id);
        this.setState({ dirDetails: notes }); 
      })
      .match(SetActiveItem, (setActiveItem: SetActiveItem) => {
        const currentNote = this.state.dirDetails.find((v: any) => v.id === setActiveItem.id && v.type === 'NOTE');
        this.setState({
          active: setActiveItem.id,
          currentNote,
        });
      })
      .match(InsertNewNote, async (insertNewNote: InsertNewNote) => {
        await insertDataForSpecifiedStore(insertNewNote.dbName, insertNewNote.storeName, insertNewNote.data);
        this.setState({
          dirDetails: [...this.state.dirDetails, insertNewNote.data],
        });
      })
      .build();
  }
}
