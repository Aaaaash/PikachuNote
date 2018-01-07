import React, { PureComponent } from 'react';
import styled from 'styled-components';

import Sidebar from '../Sidebar';

const Container = styled.div`
  min-width: 128px;
  min-height: 720px;
  height: 100vh;
  display: flex;
  background-color: #f8f5f8;
`;

const Detail = styled.div`
  width: 325px;
  background-color: #fff;
  border-right: 1px solid rgba(167, 182, 194, 0.3);
`;

const Content = styled.div`
  flex: 1;
  background-color: #fff;
`;

export default class HomePage extends PureComponent {
  render() {
    return (
      <Container>
        <Sidebar />
        <Detail />
        <Content />
      </Container>
    );
  }
}
