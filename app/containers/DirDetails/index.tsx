import React, { PureComponent } from "react";
import { Providers } from "ractor-react";
import { NonIdealState } from "@blueprintjs/core";

import SetActiveItem from "../../message/SetActiveItem";
import InsertNewNot from "../../message/InsertNewNote";
import { system } from "../../system/appSystem";
import { DirDetails } from "../../types";
import PikachuStore from "../../store/sidebar.store";
import generateUUID from "../../utils/guid";
import {
  INDEXED_DATABASE_NAME,
  NOTES_STORE_NAME
} from "../../common/constants";

import Project from "./Project";

import { Detail } from "./styled";

interface Props {
  [propsName: string]: any;
}

interface State {
}

@Providers([{ provide: PikachuStore }])
class DirDetailsView extends PureComponent<Props, State> {

  renderNonIdeal = () => (
    <NonIdealState
      title="This folder is empty"
      description="Create a new note please."
      visual="folder-open"
    />
  );

  insertNewNote = () => {
    const { currentDir } = this.props;
    system.dispatch(
      new InsertNewNot(INDEXED_DATABASE_NAME, NOTES_STORE_NAME, {
        id: generateUUID(),
        belong: currentDir,
        title: `默认笔记${Number(Math.random() * 1000)}`,
        type: "NOTE",
        content:
          '<h1><strong>helloworld<span class="ql-cursor">﻿</span></strong></h1>',
        createTime: new Date().getTime(),
        lastUpdateTime: new Date().getTime(),
        tags: ["React", "Electron"],
        class: "默认"
      })
    );
  };

  handleChildClick = (id: string) => {
    system.dispatch(new SetActiveItem(id));
  };

  renderDetails = () => {
    const { dirDetails, active } = this.props;
    return dirDetails.map((child: DirDetails) => (
      <Project
        key={child.id}
        insertNewNote={() => {
          console.log("insert");
        }}
        onCatalogClick={this.handleChildClick}
        data={child}
        active={active}
      />
    ));
  };

  render() {
    const { dirDetails } = this.props;
    return (
      <Detail>
        {dirDetails.length === 0 ? this.renderNonIdeal() : this.renderDetails()}
      </Detail>
    );
  }
}

export default DirDetailsView;
