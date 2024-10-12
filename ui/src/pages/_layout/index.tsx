import { PropsWithChildren } from "react";
import { AppContent } from "./content";
import { Layout } from "antd";
import React from "react";
import { Sidebar } from "./sidebar";

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <Layout>
      <Layout.Header></Layout.Header>
        <div className="flex">
          <Sidebar />
          <div className="flex-grow">
            <AppContent>{children}</AppContent>
          </div>
        </div>
    </Layout>
  );
}
