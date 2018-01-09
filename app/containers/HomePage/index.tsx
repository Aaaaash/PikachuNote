import React from 'react';
import styled from 'styled-components';

import Sidebar from '../Sidebar';
import DirDetails from '../DirDetails';

const Container = styled.div`
  min-width: 128px;
  min-height: 720px;
  height: 100vh;
  display: flex;
  background-color: #f8f5f8;
`;

const Content = styled.div`
  flex: 1;
  background-color: #fff;
`;

export default () => (
  <Container>
    <Sidebar />
    <DirDetails />
    <Content />
  </Container>
);
