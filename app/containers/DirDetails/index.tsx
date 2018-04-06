import React, { PureComponent, MouseEvent } from "react";
import { Providers } from "ractor-react";
import {
  ContextMenu,
  Menu,
  MenuItem,
  Icon,
  Tag,
  NonIdealState,
  EditableText
} from "@blueprintjs/core";
import moment from "moment";

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

import { Detail, Child, Titlt, AllTag, About } from "./styled";

interface Props {
  [propsName: string]: any;
}

interface State {
  isContextMenuOpen: boolean;
}

@Providers([{ provide: PikachuStore }])
class DirDetailsView extends PureComponent<Props, State> {
  state = {
    isContextMenuOpen: false
  };

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

  showContextMenu = (e: MouseEvent<any>) => {
    e.preventDefault();
    ContextMenu.show(
      <Menu>
        <MenuItem
          icon="document"
          text="新建笔记"
          onClick={this.insertNewNote}
        />
        <MenuItem icon="folder-close" text="新建文件夹" />
      </Menu>,
      { left: e.clientX, top: e.clientY },
      () => this.setState({ isContextMenuOpen: false })
    );
    this.setState({ isContextMenuOpen: true });
  };

  handleChildClick = (id: string) => {
    system.dispatch(new SetActiveItem(id));
  };

  renderDetails = () => {
    const { dirDetails, active } = this.props;
    return dirDetails.map((child: DirDetails) => (
      <Child
        key={child.id}
        onClick={() => this.handleChildClick(child.id)}
        onContextMenu={(e: MouseEvent<any>) => e.stopPropagation()}
        style={{
          backgroundColor: active === child.id ? "rgba(191,204,214,.4)" : undefined
        }}
        // onContextMenu={this.showContextMenu}
      >
        <Titlt>
          {child.type === "CATALOG" ? (
            <Icon icon="folder-close" />
          ) : (
            <Icon icon="document" />
          )}
          <EditableText value={child.title} className="editable-text-custom-style" />
        </Titlt>
        <About>
          <p>
            <span>{child.type === "CATALOG" ? "创建时间" : "最后修改时间"}</span>
            <span>
              {child.type === "CATALOG"
                ? moment(child.createTime).fromNow()
                : moment(child.lastUpdateTime).fromNow()}
            </span>
          </p>
          <AllTag>
            {child.tags &&
              child.tags.map(tag => (
                <Tag key={tag} className="pt-tag pt-minimal pt-round">
                  {tag}
                </Tag>
              ))}
          </AllTag>
        </About>
      </Child>
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
