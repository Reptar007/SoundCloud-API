import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from "./context/Modal";
import PlayerProvider from "./context/player";

import App from "./App";
import configureStore from "./store";
import { restoreCSRF, csrfFetch } from "./store/csrf";
import * as sessionActions from "./store/session";
import { createASongThunkCreator } from "./store/songs";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
  window.create = createASongThunkCreator
}

function Root() {
  return (
    <Provider store={store}>
      <PlayerProvider>
        <ModalProvider>
          <BrowserRouter> 
            <App />
          </BrowserRouter>
        </ModalProvider>
      </PlayerProvider>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
