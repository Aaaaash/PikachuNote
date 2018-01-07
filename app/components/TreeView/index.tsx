import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Icon } from '@blueprintjs/core';

import { Directory } from '../../common/constants';

const Dir = styled.div`
  height: 36px;
  line-height: 36px;
  cursor: pointer;
  transition: 200ms;
  padding: 0px 8px;
  display: flex;
  align-items: center;
  position: relative;
  &:hover {
    background-color: rgba(167, 182, 194, 0.3);
  }
`;

interface Props {
  childs: Directory[];
  level: number;
}

class TreeView extends PureComponent<Props> {
  renderTreeView = (): any => {
    const { childs, level } = this.props;
    return childs.map((subdir) => (
      <div key={subdir.id}>
        <Dir>
          <Icon iconName="pt-icon-folder-open" />
          {subdir.title}
        </Dir>
        {subdir.children.length > 0 && <TreeView childs={subdir.children} level={level + 1} />}
      </div>
    ));
  }

  render() {
    const { level } = this.props;
    return (
      <div style={{ paddingLeft: `calc(${level} * 5px)` }}>
        {this.renderTreeView()}
      </div>
    );
  }
}

export default TreeView;
