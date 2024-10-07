import { ConfigProvider, theme } from "antd";
import React from "react";

export const withTheme = (component: () => React.ReactNode) => () => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#008fbc",
      },
      components: {
        Layout: {
          siderBg: "rgb(26,29,30)",
          bodyBg: "rgb(21,23,24)",
          headerBg: "rgb(26,29,30)",
        },
        Menu: {
          colorBgContainer: "transparent",
          lineWidth: 0,
          itemSelectedBg: "rgba(255,255,255,0.12)",
          itemSelectedColor: "#fff",
          fontWeightStrong: 500,
        },
      },
      algorithm: theme.darkAlgorithm,
    }}
  >
    {component()}
  </ConfigProvider>
);
