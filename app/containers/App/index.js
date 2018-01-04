import React, { Component } from 'react';
import styled from 'styled-components';

const DragHeader = styled.header`
  -webkit-app-region: drag;
  position: absolute;
  height: 40px;
  width: 100%;
  z-index: 100;
  background-color: #434A54;
`;

export default class App extends Component {
  render() {
    return (
      <div>
        <DragHeader />
        {this.props.children}
      </div>
    );
  }
}
