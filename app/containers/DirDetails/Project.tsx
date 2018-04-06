import * as React from "react";
import { Component } from "react";
import {
  ContextMenuTarget,
  Menu,
  MenuItem,
  Icon,
  EditableText,
  Tag
} from "@blueprintjs/core";
import moment from "moment";

import { DirDetails } from "../../types";
import { Child, Titlt, AllTag, About } from "./styled";

interface Props {
  insertNewNote: () => void;
  onCatalogClick: (id: string) => void;
  data: DirDetails;
  active: string;
}

@ContextMenuTarget
class Project extends Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.renderContextMenu = this.renderContextMenu.bind(this);
  }

  public renderContextMenu() {
    return (
      <Menu>
        <MenuItem
          icon="document"
          text="新建笔记"
          onClick={this.props.insertNewNote}
        />
        <MenuItem icon="folder-close" text="新建文件夹" />
      </Menu>
    );
  }

  public onContextMenuClose() {
    // Optional method called once the context menu is closed.
  }

  public render() {
    const { data, onCatalogClick, active } = this.props;
    return (
      <Child
        onClick={() => onCatalogClick(data.id)}
        style={{
          backgroundColor:
            active === data.id ? "rgba(191,204,214,.4)" : undefined
        }}
      >
        <Titlt>
          {data.type === "CATALOG" ? (
            <Icon icon="folder-close" />
          ) : (
            <Icon icon="document" />
          )}
          <EditableText
            value={data.title}
            className="editable-text-custom-style"
            onChange={(value) => {
              console.log(value);
            }}
            onEdit={() => {
              console.log(data.id);
            }}
          />
        </Titlt>
        <About>
          <p>
            <span>{data.type === "CATALOG" ? "创建时间" : "最后修改时间"}</span>
            <span>
              {data.type === "CATALOG"
                ? moment(data.createTime).fromNow()
                : moment(data.lastUpdateTime).fromNow()}
            </span>
          </p>
          <AllTag>
            {data.tags &&
              data.tags.map(tag => (
                <Tag key={tag} className="pt-tag pt-minimal pt-round">
                  {tag}
                </Tag>
              ))}
          </AllTag>
        </About>
      </Child>
    );
  }
}

export default Project;
