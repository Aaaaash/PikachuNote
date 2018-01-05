import React, { Component } from 'react';
import { Position, Toaster, Intent } from '@blueprintjs/core';
import styled from 'styled-components';

import { INDEXED_DATABASE_NAME, INITIAL_DIR_STORE_PARAMS } from '../../common/constants';
import { injectIndexedDB, isDataBasebeCreated, createIndexDBObjectStore } from '../../utils/indexedDB';

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

export default class App extends Component {
  async componentDidMount() {
    const haveDataBase = await isDataBasebeCreated(INDEXED_DATABASE_NAME);
    if (!haveDataBase) {
      await injectIndexedDB(INDEXED_DATABASE_NAME);
      /* eslint-disable */
      if (window.__PIKACHU_NOTE_INDEXEDDB_DATABASE__ && window.__PIKACHU_NOTE_INDEXEDDB_DATABASE__.transaction) {
        this.handleShowToaster('数据库创建成功', Intent.SUCCESS);
      }

      const dirStore = await createIndexDBObjectStore(...INITIAL_DIR_STORE_PARAMS);
      if (dirStore) {
        this.handleShowToaster('数据库初始化完成', Intent.SUCCESS);
      }
      /* eslint-enable */
    }
  }

  handleShowToaster = (message, intent, timeout = 1000) => {
    this.toaster.show({
      message,
      timeout,
      intent,
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
