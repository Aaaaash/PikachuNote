import React, { PureComponent, MouseEvent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import { ContextMenu, Menu, MenuItem, Icon, Tag, NonIdealState, EditableText } from '@blueprintjs/core';
import moment from 'moment';

import { setActiveItem } from '../../actions';
import { DirDetails, ElectronAction } from '../../types';

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
  dirDetails: DirDetails[];
  active: string;
  onSetActiveItem: (id: string) => ElectronAction;
  [propsName: string]: any;
}

interface State {
  isContextMenuOpen: boolean;
}

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

  insertNewNote = (id: string) => {
    console.log(id);
    // TODO
  }

  showContextMenu = (e: MouseEvent<any>, id: string) => {
    e.preventDefault();
    ContextMenu.show(
      <Menu>
        <MenuItem iconName="pt-icon-document" text="新建笔记" onClick={() => this.insertNewNote(id)} />
        <MenuItem iconName="pt-icon-folder-close" text="新建文件夹" />
      </Menu>,
      { left: e.clientX, top: e.clientY },
      () => this.setState({ isContextMenuOpen: false })
    );
    this.setState({ isContextMenuOpen: true });
  };

  handleChildClick = (id: string) => {
    const { active, onSetActiveItem } = this.props;
    if (active !== id) onSetActiveItem(id);
  }

  renderDetails = () => {
    const { dirDetails, active } = this.props;
    return dirDetails.map((child: DirDetails) => (
      <Child
        key={child.id}
        onContextMenu={(e: MouseEvent<any>) => this.showContextMenu(e, child.id)}
        onClick={() => this.handleChildClick(child.id)}
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
      <Detail>
        {dirDetails.length === 0 ? this.renderNonIdeal() : this.renderDetails()}
      </Detail>
    );
  }
}

const mapStateToProps = (state: any) => ({
  dirDetails: state.sidebar.dirDetails,
  active: state.sidebar.active,
});

const mapDispatchToProps = (dispatch: any) => ({
  onSetActiveItem: (id: string) => dispatch(setActiveItem(id)),
});

function mergePropss(stateProps: Object, dispatchProps: Object, ownProps: Object) {
  return Object.assign({}, ownProps, stateProps, dispatchProps);
}

const withConnect = connect(mapStateToProps, mapDispatchToProps, mergePropss);

export default compose(withConnect)(DirDetailsView);
