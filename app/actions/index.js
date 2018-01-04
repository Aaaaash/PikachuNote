import {
  INSERT_NOTE
} from '../common/constants';

export function insertNote(id, payload) {
  return {
    type: INSERT_NOTE,
    id,
    payload,
  };
}
