import React, { PureComponent } from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';

const Container = styled.div`
  flex: 1;
  background-color: #fff;
`;

interface State {
  text: string;
}

class Editor extends PureComponent<{}, State> {

  state = {
    text: '',
  }

  handleChange = (value: string) => {
    this.setState({
      text: value,
    });
  }

  render() {
    return (
      <Container>
        <ReactQuill
          value={this.state.text}
          onChange={this.handleChange}
        />
      </Container>
    );
  }
}

export default Editor;
