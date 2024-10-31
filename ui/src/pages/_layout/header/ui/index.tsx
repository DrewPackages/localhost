import { Col, Layout, Row } from "antd";
import { BackButton } from "./backButton";
import { AppVersion } from "widgets/appVersion";

export function AppHeader() {
  return (
    <Layout.Header className="flex align-middle">
      <Row className="w-full h-full align-middle">
        <Col span={5}>
          <BackButton />
        </Col>
        <Col offset={14} span={5}>
          <AppVersion />
        </Col>
      </Row>
    </Layout.Header>
  );
}
