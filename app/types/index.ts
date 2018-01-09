
export interface Directory {
  id: string;
  title: string;
  children: Directory[];
  belong?: string;
}

export interface Note {
  id: string;
  belong: string,
  title: string,
  content: string,
  createTime: number;
  lastUpdateTime: number;
  tags: Array<string>,
  class: string,
}

export type DirDetails = Note | Directory;

export interface ElectronAction {
  type: string;
  [propName: string]: any;
};
