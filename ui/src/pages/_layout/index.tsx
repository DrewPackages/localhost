import { PropsWithChildren } from "react";
import { AppContent } from "./content";
import { Layout } from "antd";
import React from "react";

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <Layout>
      <Layout.Header></Layout.Header>
      <AppContent>{children}</AppContent>
    </Layout>
  );
}
