import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import TreeView from '../../components/TreeView';
import {
  fetchAllData,
  setCurrentDir,
} from '../../actions';
import { Container, Header, HeaderButton, Tree } from './styled';
import { INDEXED_DATABASE_NAME, TREE_DIRTORY_NAME } from '../../common/constants';
import { Directory, ElectronAction } from '../../types';

interface Props {
  dir: Directory[];
  currentDir: string;
  onFetchAllDir: (dbName: string, storeName: string) => ElectronAction;
  onFetchNotesByStoreID: (storeName: string) => ElectronAction;
  onSetCurrentDir: (id: string) => ElectronAction;
  [propName: string]: any;
}

class Sidebar extends PureComponent<Props> {

  componentWillMount() {
    this.props.onFetchAllDir(INDEXED_DATABASE_NAME, TREE_DIRTORY_NAME);
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

  render() {
    const { dir, onSetCurrentDir, currentDir } = this.props;
    return (
      <Container>
        <Tree>
          <TreeView childs={dir} level={0} onSetCurrentDir={onSetCurrentDir} current={currentDir} />
        </Tree>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  dir: state.sidebar.dir,
  currentDir: state.sidebar.currentDir,
});

const mapDispatchToProps = (dispatch: any) => ({
  onFetchAllDir: (dbName: string, storeName: string) => dispatch(fetchAllData(dbName, storeName)),
  onSetCurrentDir: (id: string) => dispatch(setCurrentDir(id)),
});

function mergePropss(stateProps: Object, dispatchProps: Object, ownProps: Object) {
  return Object.assign({}, ownProps, stateProps, dispatchProps);
}

const withConnect = connect(mapStateToProps, mapDispatchToProps, mergePropss);

export default compose(withConnect)(Sidebar);
