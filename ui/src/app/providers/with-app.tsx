import { App } from "antd";
import React from "react";
import { ErrorsDisplayProvider } from "shared/errors";

export const withApp = (component: () => React.ReactNode) => () =>
  (
    <App>
      <ErrorsDisplayProvider>{component()}</ErrorsDisplayProvider>
    </App>
  );
