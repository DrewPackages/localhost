// Or use @loadable/component, as part of the tutorial - uncritically
import { Navigate, Route, Routes } from "react-router-dom";
import React, { lazy } from "react";
import AppLayout from "./_layout";

const MarketplacePage = lazy(() => import("./marketplace"));
const DappInfoPage = lazy(() => import("./dapp"));
const RunningAppsPage = lazy(() => import("./running-apps"));
const Webpage = lazy(() => import("./webpage"));

export const Routing = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppLayout>
            <MarketplacePage />
          </AppLayout>
        }
      />

      <Route
        path="/running-apps"
        element={
          <AppLayout>
            <RunningAppsPage />
          </AppLayout>
        }
      />

      <Route
        path="/dapp/:dappId"
        element={
          <AppLayout>
            <DappInfoPage />
          </AppLayout>
        }
      />

      <Route
        path="/webpage"
        element={
          <AppLayout>
            <Webpage />
          </AppLayout>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
