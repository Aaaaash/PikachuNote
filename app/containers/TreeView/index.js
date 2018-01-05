import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { ContextMenu, Menu, MenuItem } from '@blueprintjs/core';

import {
  insertNote,
} from '../../actions';

import { Container, Header, HeaderButton, Tree, DirRoot, ChildDir } from './styled';

class TreeView extends PureComponent {
  state = {
    isContextMenuOpen: false
  };

  handleInsertNote = () => {
    const { onInsertNewNote } = this.props;
    onInsertNewNote();
  }

  showContextMenu = e => {
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

  renderTreeView = () => {
    const { dir } = this.props;
    return dir.map((item) => (
      <div key={item.id} style={{ position: 'relative' }}>
        <DirRoot>
          <span className="pt-icon-standard pt-icon-folder-open" />
          {item.title}
        </DirRoot>
        {item.children && item.children.length > 0 && item.children.map((child) => (
          <ChildDir>
            <span className="pt-icon-standard pt-icon-document" />
            {child.title}
          </ChildDir>
        ))}
      </div>
    ));
  }

  render() {
    return (
      <Container>
        {this.renderHeader()}
        <Tree onContextMenu={this.showContextMenu}>
          {this.renderTreeView()}
        </Tree>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  dir: state.treeViewReducer.dir,
});

const mapDispatchToProps = (dispatch) => ({
  onInsertNewNote: () => dispatch(insertNote()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TreeView);
