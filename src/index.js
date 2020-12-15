import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/App.js";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "./index.css";

import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./modules";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(rootReducer, composeWithDevTools());

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Noto Sans KR", serif',
    color: "#3c3c3c",
  },
  palette: {
    primary: {
      main: "#50B4FF",
    },
    secondary: {
      main: "#648CFF",
    },
    gradient: {
      main: "linear-gradient(to right bottom, #FF92B1,#FF6A89)",
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.querySelector("#root")
);
