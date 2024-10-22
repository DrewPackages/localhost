import { FormulaExecutionDump } from "@drewpackages/host-common";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "shared/model/hooks";
import { getDeploymentStatus } from "../api/deploymentStatus";
import {
  selectDappDeploymentInfo,
  selectDappDeploymentPorts,
  selectDappDeploymentRequestStatus,
} from "../model/slice";
import { Button, Flex, Space, Spin, Typography } from "antd";
import { deploy } from "../api/deploy";
import { getPorts } from "../api/getPorts";

interface IDappActionProps {
  dappId: string;
  dump?: FormulaExecutionDump | "not-provided";
}

export function DappActions({ dappId, dump }: IDappActionProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDeploymentStatus({ dappId }));

    const interval = setInterval(
      () => dispatch(getDeploymentStatus({ dappId })),
      2000
    );
    return () => clearInterval(interval);
  }, [dappId, dispatch]);

  useEffect(() => {
    dispatch(getPorts({ dappId }));

    const interval = setInterval(() => dispatch(getPorts({ dappId })), 2000);
    return () => clearInterval(interval);
  }, [dappId, dispatch]);

  const isDeployRequestInFlight = useAppSelector(
    selectDappDeploymentRequestStatus
  );

  const { isDeploymentLoading, isDeployed } = useAppSelector(
    selectDappDeploymentInfo
  );
  const { deploymentPorts } = useAppSelector(selectDappDeploymentPorts);

  const onDeployClick = useCallback(() => {
    if (dump && dump !== "not-provided") {
      dispatch(deploy({ dappId, dump })).then(() =>
        dispatch(getPorts({ dappId }))
      );
    }
  }, [dappId, dump, dispatch]);

  const onOpenAddClick = useCallback(
    (port: number) => {
      navigate(`/webpage/${port}`, {
        state: {
          back: {
            navigateBack: true,
          },
          isSidebarHidden: true,
        },
      });
    },
    [navigate]
  );

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
