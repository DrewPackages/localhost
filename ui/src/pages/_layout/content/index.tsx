import { Layout } from "antd";
import { PropsWithChildren } from "react";

const { Content } = Layout;

interface AppContentProps {}

export function AppContent({ children }: PropsWithChildren<AppContentProps>) {
  return <Content className="p-4 min-h-screen">{children}</Content>;
}
