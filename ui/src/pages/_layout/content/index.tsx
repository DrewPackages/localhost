import { EditOutlined } from "@ant-design/icons";
import { FloatButton, Layout } from "antd";
import { PropsWithChildren, useCallback } from "react";
import service from "localhostService";

const { Content } = Layout;

interface AppContentProps {}

export function AppContent({ children }: PropsWithChildren<AppContentProps>) {
  const onFeedbackClick = useCallback(() => {
    service.openUrlInBrowser("https://forms.gle/ggRkx4YmzdosSeuU7");
  }, []);
  return (
    <Content className="p-4 min-h-screen">
      {children}
      <FloatButton
        type="primary"
        tooltip="Feedback"
        icon={<EditOutlined />}
        onClick={onFeedbackClick}
      />
    </Content>
  );
}
