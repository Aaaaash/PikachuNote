import React, { PureComponent } from 'react';
import styled from 'styled-components';
import '@blueprintjs/core/dist/blueprint.css';

import TreeView from '../TreeView';

const ipc = require('electron').ipcRenderer;

console.log(ipc);
const Container = styled.div`
  min-width: 128px;
  min-height: 720px;
  display: flex;
  padding-top: 40px;
  flex-direction: column;
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  background-color: #f8f5f8;
`;

const Detail = styled.div`
  width: 325px;
  background-color: #fff;
  border-right: 1px solid #e0e1e5;
`;

const Content = styled.div`
  flex: 1;
  background-color: #fff;
`;

export default class HomePage extends PureComponent {
  render() {
    return (
      <Container>
        <Main>
          <TreeView />
          <Detail />
          <Content />
        </Main>
      </Container>
    );
  }
}
