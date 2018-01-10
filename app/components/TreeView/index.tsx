import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { ContextMenu, Menu, MenuItem, Icon } from '@blueprintjs/core';

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
  current: string;
  onSetCurrentDir: (id: string) => {};
  [propName: string]: any;
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
          <MenuItem iconName="pt-icon-document" text="笔记" />
          <MenuItem iconName="pt-icon-folder-close" text="文件夹" />
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
    const { current } = this.props;
    if (current !== id) {
      this.props.onSetCurrentDir(id);
    }
    this.setState({
      dirState: { ...dirState, [id]: !dirState[id] },
    })
  }

  renderTreeView = (): any => {
    const { childs, level, onSetCurrentDir, current } = this.props;
    const { dirState } = this.state;
    return childs.map((subdir) => (
      <div key={subdir.id}>
        <Dir
          onContextMenu={current === subdir.id ? this.showContextMenu : () => {}}
          style={{
            paddingLeft: `calc(${level} * 10px)`,
            backgroundColor: current === subdir.id && 'rgba(167, 182, 194, 0.3)',
          }}
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
          <TreeView
            childs={subdir.children}
            level={level + 1}
            onSetCurrentDir={onSetCurrentDir}
            current={current}
          />
        }
      </div>
    ));
  }

  render() {
    return <div> {this.renderTreeView()} </div>;
  }
}

export default TreeView;
