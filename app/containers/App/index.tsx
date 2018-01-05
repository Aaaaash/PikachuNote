import * as React from 'react';
import { PureComponent } from 'react';
import { Position, Toaster, Intent } from '@blueprintjs/core';
import styled from 'styled-components';

import { INDEXED_DATABASE_NAME } from '../../common/constants';
import {
  injectIndexedDB,
  isDataBasebeCreated,
  deleteDatabaseByName,
} from '../../utils/indexedDB';

const DragHeader = styled.header`
  -webkit-app-region: drag;
  height: 50px;
  width: 100%;
  z-index: 100;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0px 20px;
  background-color: #434a54;
`;

interface Props {

}

interface ElectronWindow {
  [propName: string]: any;
}

export default class App extends PureComponent<Props> {
  toaster: any;
  async componentDidMount() {
    // 测试阶段先主动删除
    await deleteDatabaseByName(INDEXED_DATABASE_NAME);
    const haveDataBase = await isDataBasebeCreated(INDEXED_DATABASE_NAME);
    if (!haveDataBase) {
      await injectIndexedDB(INDEXED_DATABASE_NAME);
      /* eslint-disable */
      if (
        (window as ElectronWindow).__PIKACHU_NOTE_INDEXEDDB_DATABASE__ && (window as ElectronWindow).__PIKACHU_NOTE_INDEXEDDB_DATABASE__.transaction
      ) {
        this.handleShowToaster('数据库创建成功', Intent.SUCCESS);
      }

      // const dirStore = await createIndexDBObjectStore(...INITIAL_DIR_STORE_PARAMS);
      // if (dirStore) {
      //   this.handleShowToaster('数据库初始化完成', Intent.SUCCESS);
      // }
      /* eslint-enable */
    }
  }

  handleShowToaster = (message: string, intent: Intent, timeout = 1000) => {
    this.toaster.show({
      message,
      timeout,
      intent
    });
  };

  render() {
    return (
      <div>
        <Toaster
          position={Position.BOTTOM_RIGHT}
          ref={ref => {
            this.toaster = ref;
          }}
        />
        <DragHeader>
          <div className="pt-input-group .modifier">
            <span className="pt-icon pt-icon-search" />
            <input
              className="pt-input pt-round"
              type="search"
              placeholder="Search input"
              dir="auto"
            />
          </div>
        </DragHeader>
        {this.props.children}
      </div>
    );
  }
}
