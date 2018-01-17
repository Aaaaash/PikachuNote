import { Note } from '../types';

class InsertNewNote {
  constructor(public dbName: string, public storeName: string, public data: Note) {}
}

export default InsertNewNote;
