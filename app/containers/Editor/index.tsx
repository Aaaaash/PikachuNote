import React, { PureComponent } from "react";
import styled from "styled-components";
import ReactQuill from "react-quill";
import { Providers } from "ractor-react";
import { isEmpty } from "lodash";
import { NonIdealState } from "@blueprintjs/core";
import moment from "moment";

import PikachuStore from "../../store/sidebar.store";
import { Note } from "../../types";

const Container = styled.div`
  flex: 1;
  background-color: #fff;
`;

interface Props {
  [propName: string]: any;
}

interface State {
  text: string;
}

@Providers([{ provide: PikachuStore }])
class Editor extends PureComponent<Props, State> {
  state = {
    text: ""
  };

  handleChange = (value: string) => {
    console.log(value);
    this.setState({
      text: value
    });
  };

  renderNoteDetails = (): JSX.Element => {
    const { currentNote } = this.props;
    return (
      <div>
        <p>{currentNote.title}</p>
        <p>{moment((currentNote as Note).lastUpdateTime).format('LLL')}</p>
        <ReactQuill
          value={(currentNote as Note).content}
          onChange={this.handleChange}
        />
      </div>
    );
  };

  render(): JSX.Element {
    const { currentNote } = this.props;
    return (
      <Container>
        {isEmpty(currentNote) ? (
          <NonIdealState visual="folder-close" />
        ) : (
          this.renderNoteDetails()
        )}
      </Container>
    );
  }
}

export default Editor;
