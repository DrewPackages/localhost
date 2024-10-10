import { PropsWithChildren } from "react";
import { AppContent } from "./content";
import { Layout } from "antd";
import React from "react";
import { DockerCheck } from "features/docker";

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <Layout>
      <DockerCheck>
        <Layout.Header></Layout.Header>
        <AppContent>{children}</AppContent>
      </DockerCheck>
    </Layout>
  );
}
