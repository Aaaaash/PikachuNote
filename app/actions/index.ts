import {
  INSERT_NOTE
} from '../common/constants';

export function insertNote(id: any, payload: any) {
  return {
    type: INSERT_NOTE,
    id,
    payload,
  };
}
