import React, { PureComponent } from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NonIdealState } from '@blueprintjs/core';

import { Note } from '../../types';

const Container = styled.div`
  flex: 1;
  background-color: #fff;
`;

interface Props {
  currentNote: Note | {};
  [propName: string]: any;
}

interface State {
  text: string;
}

class Editor extends PureComponent<Props, State> {

  state = {
    text: '',
  }

  handleChange = (value: string) => {
    console.log(value);
    this.setState({
      text: value,
    });
  }

  render(): JSX.Element {
    const { currentNote } = this.props;
    return (
      <Container>
        {isEmpty(currentNote)
        ? <NonIdealState
          visual="folder-close"
        />
        : <ReactQuill
            value={(currentNote as Note).content}
            onChange={this.handleChange}
          />}
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  currentNote: state.sidebar.currentNote,
});

const mapDispatchToProps = (dispatch: any) => ({});

function mergePropss(stateProps: Object, dispatchProps: Object, ownProps: Object) {
  return Object.assign({}, ownProps, stateProps, dispatchProps);
}

const withConnect = connect(mapStateToProps, mapDispatchToProps, mergePropss);

export default compose(withConnect)(Editor);

