import React, { PureComponent } from 'react';
import { Position, Toaster, Intent } from '@blueprintjs/core';
import styled from 'styled-components';

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

export default class App extends PureComponent<Props> {
  toaster: any;

  handleShowToaster = (message: string, intent: Intent, timeout: number = 1000) => {
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
