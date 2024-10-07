// Or use @loadable/component, as part of the tutorial - uncritically
import { Route, Routes, Navigate } from "react-router-dom";
import React, { lazy } from "react";
import AppLayout from "./_layout";

const MarketplacePage = lazy(() => import("./marketplace"));

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
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
