import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Icon } from '@blueprintjs/core';
import { ContextMenu, Menu, MenuItem } from '@blueprintjs/core';

import StateFulIcon from '../StatefulIcon';
import { Directory } from '../../types';

const Dir = styled.div`
  height: 36px;
  line-height: 36px;
  cursor: pointer;
  transition: 200ms;
  padding: 0px 8px;
  display: flex;
  align-items: center;
  position: relative;
  &:hover {
    background-color: rgba(167, 182, 194, 0.3);
  }
`;

interface Props {
  childs: Directory[];
  level: number;
}

interface State {
  dirState: object;
  isContextMenuOpen: boolean;
}

class TreeView extends PureComponent<Props, State> {
  state = {
    dirState: {},
    isContextMenuOpen: false,
  }

  componentWillMount() {
    const { childs } = this.props;
    this.computedDirState(childs);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.childs !== this.props.childs) {
      this.computedDirState(nextProps.childs);
    }
  }

  showContextMenu = (e: any) => {
    e.preventDefault();
    ContextMenu.show(
      <Menu>
        <MenuItem iconName="pt-icon-add" text="新建">
          <MenuItem iconName="pt-icon-document" text="记事本" />
          <MenuItem iconName="pt-icon-folder-open" text="文件夹" />
        </MenuItem>
      </Menu>,
      { left: e.clientX, top: e.clientY },
      () => this.setState({ isContextMenuOpen: false })
    );
    this.setState({ isContextMenuOpen: true });
  };

  computedDirState(childs: Directory[]): void {
    const { dirState } = this.state;
    const newState = {};
    childs.forEach((v) => {
      newState[v.id] = false;
    });
    this.setState({
      dirState: { ...dirState, ...newState },
    });
  }

  handleDirClick = (id: string): void => {
    const { dirState } = this.state;
    this.setState({
      dirState: { ...dirState, [id]: !dirState[id] },
    })
  }

  renderTreeView = (): any => {
    const { childs, level } = this.props;
    const { dirState } = this.state;
    return childs.map((subdir) => (
      <div key={subdir.id}>
        <Dir
          onContextMenu={this.showContextMenu}
          style={{ paddingLeft: `calc(${level} * 10px)` }}
          onClick={() => this.handleDirClick(subdir.id)}
        >
          <StateFulIcon
            enableElement={<Icon iconName="pt-icon-caret-down" />}
            enable={dirState[subdir.id]}
            disableElement={<Icon iconName="pt-icon-caret-right" />}
          />
          <StateFulIcon
            enableElement={<Icon iconName="pt-icon-folder-open" />}
            enable={dirState[subdir.id]}
            disableElement={<Icon iconName="pt-icon-folder-close" />}
          />
          {subdir.title}
        </Dir>
        {subdir.children.length > 0 && dirState[subdir.id] &&
            <TreeView childs={subdir.children} level={level + 1} />}
      </div>
    ));
  }

  render() {
    return <div> {this.renderTreeView()} </div>;
  }
}

export default TreeView;
