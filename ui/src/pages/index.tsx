// Or use @loadable/component, as part of the tutorial - uncritically
import { Route, Routes } from "react-router-dom";
import React, { lazy } from "react";
import AppLayout from "./_layout";

const MarketplacePage = lazy(() => import("./marketplace"));
const RunningAppsPage = lazy(() => import("./running-apps"));

export const Routing = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<MarketplacePage />} />
        <Route path="/running-apps" element={<RunningAppsPage />} />
      </Routes>
    </AppLayout>
  );
};
