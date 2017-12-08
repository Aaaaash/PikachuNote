import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { TitleBar, Toolbar } from 'react-desktop/macOs';
import '@blueprintjs/core/dist/blueprint.css';

const ipc = require('electron').ipcRenderer;
console.log(ipc);
const Container = styled.div`
  min-width: 128px;
  height: 925px;
  display: flex;
  flex-direction: column;
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  background-color: #f8f5f8;
`;

const Left = styled.div`
  width: 250px;
  border-right: 1px solid #e0e1e5;
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
          <Left>
            文件夹
          </Left>
          <Detail>
            详情
          </Detail>
          <Content>
            内容
          </Content>
        </Main>
      </Container>
    );
  }
}
