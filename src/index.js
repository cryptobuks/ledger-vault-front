//@flow
import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { Switch, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./containers/App/App";
import create from "./redux/create";
import registerServiceWorker from "./registerServiceWorker";
import RestlayProvider from "./restlay/RestlayProvider";
import GlobalLoading from "./components/GlobalLoading";
import network from "./network";

import {
  PrivateRoute,
  Login,
  LoginTest,
  Logout,
  AlertsContainer,
  I18nProvider
} from "./containers";

import "./styles/index.css";

const muiTheme = getMuiTheme({
  fontFamily: "Open Sans, sans-serif"
});

const locale = window.localStorage.getItem("locale") || "en";

const store = create({ locale });

const $root = document.getElementById("root");

$root &&
  ReactDOM.render(
    <Provider store={store}>
      <RestlayProvider
        network={network}
        connectDataOptDefaults={{ RenderLoading: GlobalLoading }}
      >
        <MuiThemeProvider muiTheme={muiTheme}>
          <I18nProvider>
            <div>
              <AlertsContainer />
              <BrowserRouter>
                <Switch>
                  <Route path="/login" component={Login} />
                  <Route path="/logintest" component={LoginTest} />
                  <Route path="/logout" component={Logout} />
                  <PrivateRoute path="/" component={App} />
                </Switch>
              </BrowserRouter>
            </div>
          </I18nProvider>
        </MuiThemeProvider>
      </RestlayProvider>
    </Provider>,
    $root
  );

registerServiceWorker();
