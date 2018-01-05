import React, { Component } from 'react';
import { Position, Toaster, Intent } from '@blueprintjs/core';
import styled from 'styled-components';
import connectIndexDB from '../../utils/connectIndexDB';

const DragHeader = styled.header`
  -webkit-app-region: drag;
  position: absolute;
  height: 40px;
  width: 100%;
  z-index: 100;
  background-color: #434A54;
`;

export default class App extends Component {
  componentDidMount() {
    setTimeout(() => {
      const db = connectIndexDB('PIKACHUDB');
      if (db) {
        this.handleShowToaster('数据库已打开');
      }
    }, 3000);
  }

  handleShowToaster = (message) => {
    this.toaster.show({ message, timeout: 1000, intent: Intent.SUCCESS, });
  }

  render() {
    return (
      <div>
        <Toaster position={Position.BOTTOM_RIGHT} ref={(ref) => { this.toaster = ref; }} />
        <DragHeader />
        {this.props.children}
      </div>
    );
  }
}
