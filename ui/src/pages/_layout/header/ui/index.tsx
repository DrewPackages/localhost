import { Flex, Layout } from "antd";
import { BackButton } from "./backButton";
import { AppVersion } from "widgets/appVersion";

export function AppHeader() {
  return (
    <Layout.Header className="flex align-middle">
      <BackButton />
      <Flex className="w-full h-full" justify="end" align="center">
        <AppVersion />
      </Flex>
    </Layout.Header>
  );
}
