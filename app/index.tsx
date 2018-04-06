import * as React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "ractor-react";
import { system } from "./system/appSystem";
import Route from "./routes";
import "./app.global.scss";

import { isDataBasebeCreated } from "./api/indexdb";
import { INDEXED_DATABASE_NAME } from "./common/constants";
import PikachuStore from "./store/sidebar.store";
import initialDatabase from "./initialDatabase";

isDataBasebeCreated(INDEXED_DATABASE_NAME)
  .then((haveDb): any => {
    if (!haveDb) {
      return initialDatabase();
    }
    return null;
  })
  .then(() => {
    render(
      <AppContainer>
        <Provider system={system} stores={[PikachuStore]}>
          <Route />
        </Provider>
      </AppContainer>,
      document.getElementById("root")
    );
  });
