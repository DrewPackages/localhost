import compose from "compose-function";
import { withTheme } from "./with-theme";
import { withRouter } from "./with-router";
import { withRedux } from "./with-redux";
import { withApp } from "./with-app";

export const withProviders = compose(withTheme, withApp, withRedux, withRouter);
