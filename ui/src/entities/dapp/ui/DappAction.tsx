import { FormulaExecutionDump } from "@drewpackages/host-common";
import { Button, Flex, Space, Spin, Typography } from "antd";

interface IDappActionProps {
  dappId: string;
  dump?: FormulaExecutionDump | "not-provided";
  isDeployRequestInFlight: boolean;
  isDeploymentLoading: boolean;
  isDeployed?: boolean;
  deploymentPorts?: Array<{
    name: string;
    port: number;
  }>;
  onDeployClick: () => void;
  onOpenAddClick: (port: number) => void;
}

export function DappActions({
  dump,
  isDeployRequestInFlight,
  isDeploymentLoading,
  isDeployed,
  deploymentPorts,
  onDeployClick,
  onOpenAddClick,
}: IDappActionProps) {
  if (dump === "not-provided") {
    return (
      <Flex justify="center">
        <Typography.Text strong>Work in progress</Typography.Text>
      </Flex>
    );
  }

  if (isDeploymentLoading && dump == null) {
    return <Spin size="small" />;
  }

  if (isDeployRequestInFlight) {
    return (
      <Space size="middle">
        <Spin />{" "}
        <Typography.Text strong>Deployment in progress</Typography.Text>
      </Space>
    );
  }

  return (
    <Space size="middle">
      <Button type={isDeployed ? "dashed" : "primary"} onClick={onDeployClick}>
        {isDeployed ? "Redeploy" : "Deploy"}
      </Button>
      {deploymentPorts?.length === 1 && (
        <Button
          type={"primary"}
          onClick={() => onOpenAddClick(deploymentPorts[0].port)}
        >
          Open app
        </Button>
      )}
    </Space>
  );
}
