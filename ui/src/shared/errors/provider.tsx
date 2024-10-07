import { PropsWithChildren, createContext, useMemo } from "react";
import { IErrorDisplay } from "./types";
import { App } from "antd";

export const ErrorDisplay = createContext<IErrorDisplay>({ display() {} });

export function ErrorsDisplayProvider({ children }: PropsWithChildren) {
  const { notification } = App.useApp();

  const display = useMemo<IErrorDisplay>(
    () => ({
      display(err) {
        switch (err.level) {
          case "error":
            notification.error({
              message: err.label,
              description: err.content,
            });
            break;
          case "warning":
            notification.warning({
              message: err.label,
              description: err.content,
            });
        }
      },
    }),
    [notification]
  );
  return (
    <ErrorDisplay.Provider value={display}>{children}</ErrorDisplay.Provider>
  );
}
