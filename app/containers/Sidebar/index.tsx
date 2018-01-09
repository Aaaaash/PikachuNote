import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import TreeView from '../../components/TreeView';
import {
  fetchAllData,
} from '../../actions';
import { Container, Header, HeaderButton, Tree } from './styled';
import { INDEXED_DATABASE_NAME, TREE_DIRTORY_NAME } from '../../common/constants';
import { Directory, DirDetails } from '../../types';

interface Props {
  dir: Directory[];
  dirDetails: DirDetails[];
  onFetchAllDir: (dbName: string, storeName: string) => {};
  onFetchNotesByStoreID: (storeName: string) => {};
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
    const { dir, dirDetails } = this.props;
    console.log(dirDetails);
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
  dirDetails: state.sidebarReducer.dirDetails,
});

const mapDispatchToProps = (dispatch: any) => ({
  onFetchAllDir: (dbName: string, storeName: string) => dispatch(fetchAllData(dbName, storeName)),
});

function mergePropss(stateProps: Object, dispatchProps: Object, ownProps: Object) {
  return Object.assign({}, ownProps, stateProps, dispatchProps);
}

const withConnect = connect(mapStateToProps, mapDispatchToProps, mergePropss);

export default compose(withConnect)(Sidebar);
