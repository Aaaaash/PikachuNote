import React, { PureComponent } from 'react';
import { Providers } from 'ractor-react';

import { FetchDirectory } from '../../message/FetchDirectory';
import { SetCurrentDir } from '../../message/SetCurrentDir';
import { SideBarStore } from '../../store/sidebar.store';
import { system } from '../../system/appSystem';
import TreeView from '../../components/TreeView';
import { Container, Header, HeaderButton, Tree } from './styled';
import { INDEXED_DATABASE_NAME, TREE_DIRTORY_NAME } from '../../common/constants';

interface Props {
  [propName: string]: any;
}

@Providers([
	{ provide: SideBarStore }
])
class Sidebar extends PureComponent<Props> {

  componentWillMount() {
    system.dispatch(new FetchDirectory(
      INDEXED_DATABASE_NAME,
      TREE_DIRTORY_NAME,
    ));
  }

  handleInsertNote = () => {
    const { onInsertNewNote } = this.props;
    onInsertNewNote();
  }

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

  private setCurrentDir = (id: string) => {
    system.dispatch(new SetCurrentDir(id));
  }
  render() {
    const { dir, currentDir } = this.props;
    return (
      <Container>
        <Tree>
          <TreeView
            childs={dir}
            level={0}
            onSetCurrentDir={this.setCurrentDir}
            current={currentDir}
          />
        </Tree>
      </Container>
    );
  }
}

export default Sidebar;
