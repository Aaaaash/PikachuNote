import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { TitleBar, Toolbar } from 'react-desktop/macOs';
import '@blueprintjs/core/dist/blueprint.css';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default class HomePage extends PureComponent {
  render() {
    return (
      <Container>
        <TitleBar controls inset>
          <Toolbar height="43" horizontalAlignment="center" />
        </TitleBar>
      </Container>
    );
  }
}
