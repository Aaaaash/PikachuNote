import React from 'react';
import styled from 'styled-components';
import Sidebar from '../Sidebar';
import DirDetails from '../DirDetails';
import Editor from '../Editor';

const Container = styled.div`
  min-width: 128px;
  min-height: 720px;
  height: 100vh;
  display: flex;
  background-color: #f8f5f8;
`;

export default () => (
  <Container>
    <Sidebar />
    <DirDetails />
    <Editor />
  </Container>
);
