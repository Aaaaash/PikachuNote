import React, { PureComponent, MouseEvent } from 'react';
import { Providers } from 'ractor-react';
import styled from 'styled-components';
import { ContextMenu, Menu, MenuItem, Icon, Tag, NonIdealState, EditableText } from '@blueprintjs/core';
import moment from 'moment';

import { SetActiveItem } from '../../message/SetActiveItem';
import InsertNewNot from '../../message/InsertNewNote';
import { system } from '../../system/appSystem';
import { DirDetails } from '../../types';
import { SideBarStore } from '../../store/sidebar.store';
import generateUUID from '../../utils/guid';
import { INDEXED_DATABASE_NAME, NOTES_STORE_NAME } from '../../common/constants';

const Detail = styled.div`
  width: 325px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-right: 1px solid rgba(167, 182, 194, 0.3);
`;

const Child = styled.div`
  width: 100%;
  height: 64px;
  padding: 10px;
  cursor: pointer;
  box-shadow: inset 0 1px 0 0 rgba(16,22,26,.15);
  &:hover {
    background-color: rgba(191,204,214,.4);
  }
`;

const Titlt = styled.div`
  display: flex;
  height: 30px;
  align-items: center;
  & > span {
    padding-right: 10px;
  }
`;

const AllTag = styled.p`
  margin: 0px 0px 0px 10px;
  & > span {
    margin-right: 5px;
  }
`;

const About = styled.p`
  font-size: 12px;
  color: #A7B6C2;
  & > span {
    margin-right: 10px;
  }
`;

interface Props {
  [propsName: string]: any;
}

interface State {
  isContextMenuOpen: boolean;
}

@Providers([
	{ provide: SideBarStore }
])
class DirDetailsView extends PureComponent<Props, State> {

  state = {
    isContextMenuOpen: false,
  }

  renderNonIdeal = () => (
    <NonIdealState
      title="This folder is empty"
      description="Create a new note please."
      visual="folder-open"
    />
  )

  insertNewNote = () => {
    const { currentDir } = this.props;
    system.dispatch(new InsertNewNot(
      INDEXED_DATABASE_NAME,
      NOTES_STORE_NAME,
      {
        id: generateUUID(),
        belong: currentDir,
        title: `默认笔记${Number(Math.random() * 1000)}`,
        type: 'NOTE',
        content: '<h1><strong>helloworld<span class="ql-cursor">﻿</span></strong></h1>',
        createTime: new Date().getTime(),
        lastUpdateTime: new Date().getTime(),
        tags: ['React', 'Electron'],
        class: '默认',
      }
    ));
  }

  showContextMenu = (e: MouseEvent<any>) => {
    e.preventDefault();
    ContextMenu.show(
      <Menu>
        <MenuItem iconName="pt-icon-document" text="新建笔记" onClick={this.insertNewNote} />
        <MenuItem iconName="pt-icon-folder-close" text="新建文件夹" />
      </Menu>,
      { left: e.clientX, top: e.clientY },
      () => this.setState({ isContextMenuOpen: false })
    );
    this.setState({ isContextMenuOpen: true });
  };

  handleChildClick = (id: string) => {
    system.dispatch(new SetActiveItem(id));
  }

  renderDetails = () => {
    const { dirDetails, active } = this.props;
    return dirDetails.map((child: DirDetails) => (
      <Child
        key={child.id}
        onClick={() => this.handleChildClick(child.id)}
        onContextMenu={(e: MouseEvent<any>) => e.stopPropagation()}
        style={{ backgroundColor: active === child.id && 'rgba(191,204,214,.4)' }}
      >
        <Titlt>
          {child.type === 'CATALOG'
            ? <Icon iconName="pt-icon-folder-close" />
            : <Icon iconName="pt-icon-document" />}
          <EditableText value={child.title} />
          <AllTag>
            {child.tags
              && child.tags.map((tag) => (
                <Tag key={tag} className="pt-tag pt-minimal pt-round">{tag}</Tag>
              ))}
          </AllTag>
        </Titlt>
        <About>
          <span>{child.type === 'CATALOG' ? '创建时间' : '最后修改时间'}</span>
          <span>{child.type === 'CATALOG'
            ? moment(child.createTime).format('ll')
            : moment(child.lastUpdateTime).format('ll')}</span>
        </About>
      </Child>
    ));
  }

  render() {
    const { dirDetails } = this.props;
    return (
      <Detail onContextMenu={this.showContextMenu}>
        {dirDetails.length === 0 ? this.renderNonIdeal() : this.renderDetails()}
      </Detail>
    );
  }
}

export default DirDetailsView;
