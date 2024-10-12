import { PropsWithChildren } from "react";
import { AppContent } from "./content";
import { Layout } from "antd";
import React from "react";
import { Sidebar } from "./sidebar";

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <Layout>
      <Layout.Header></Layout.Header>
      <Layout>
          <Sidebar />
          <Layout>
            <AppContent>{children}</AppContent>
          </Layout>
        </Layout>
    </Layout>
  );
}
