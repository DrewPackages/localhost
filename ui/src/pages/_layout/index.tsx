import { PropsWithChildren } from "react";
import { AppContent } from "./content";
import { Layout } from "antd";
import React from "react";
import { DockerCheck } from "features/docker";
import { AppHeader } from "./header/ui";

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <Layout>
      <DockerCheck>
        <AppHeader />
        <AppContent>{children}</AppContent>
      </DockerCheck>
    </Layout>
  );
}
