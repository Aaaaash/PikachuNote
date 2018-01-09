
export interface Directory {
  id: string;
  title: string;
  children: Directory[];
}

export interface ElectronAction {
  type: string;
  [propName: string]: any;
};
