import * as React from 'react';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ContextMenu, Menu, MenuItem, Icon } from '@blueprintjs/core';

import {
  insertNote,
} from '../../actions';

import { Container, Header, HeaderButton, Tree, DirRoot, ChildDir } from './styled';


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

  renderTreeView = () => {
    const { dir } = this.props;
    return dir.map((item: any) => (
      <div key={item.id} style={{ position: 'relative' }}>
        <DirRoot onContextMenu={this.showContextMenu}>
          <Icon iconName="pt-icon-folder-open" />
          {item.title}
        </DirRoot>
        {item.children && item.children.length > 0 && item.children.map((child: any) => (
          <ChildDir>
            <Icon iconName="pt-icon-folder-open" />
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
        <Tree>
          {this.renderTreeView()}
        </Tree>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  dir: state.treeViewReducer.dir,
});

const mapDispatchToProps = (dispatch: any) => ({
  onInsertNewNote: () => dispatch(insertNote(0, 'keke')),
});

function mergePropss(stateProps: Object, dispatchProps: Object, ownProps: Object) {
  return Object.assign({}, ownProps, stateProps, dispatchProps);
}

const withConnect = connect(mapStateToProps, mapDispatchToProps, mergePropss);

export default compose(withConnect)(Sidebar);
