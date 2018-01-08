import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ContextMenu, Menu, MenuItem } from '@blueprintjs/core';

import TreeView from '../../components/TreeView';
import {
  insertNote,
} from '../../actions';

import { Container, Header, HeaderButton, Tree } from './styled';


interface Props {
  [propName: string]: any;
}

class Sidebar extends PureComponent<Props> {
  state = {
    isContextMenuOpen: false
  };

  handleInsertNote = () => {
    const { onInsertNewNote } = this.props;
    onInsertNewNote();
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

  renderHeader = () => (
    <Header>
      <HeaderButton
        type="button"
        title="新建"
        onClick={this.handleInsertNote}
        className="pt-button pt-minimal pt-icon-add .modifier"
      />
      <HeaderButton
        type="button"
        title="导入"
        className="pt-button pt-minimal pt-icon-cloud-upload .modifier"
      />
    </Header>
  );

  render() {
    const { dir } = this.props;
    return (
      <Container>
        {this.renderHeader()}
        <Tree>
          <TreeView childs={dir} level={0} />
        </Tree>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  dir: state.sidebarReducer.dir,
});

const mapDispatchToProps = (dispatch: any) => ({
  onInsertNewNote: () => dispatch(insertNote(0, 'keke')),
});

function mergePropss(stateProps: Object, dispatchProps: Object, ownProps: Object) {
  return Object.assign({}, ownProps, stateProps, dispatchProps);
}

const withConnect = connect(mapStateToProps, mapDispatchToProps, mergePropss);

export default compose(withConnect)(Sidebar);
