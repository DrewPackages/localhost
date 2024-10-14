import { FormulaExecutionDump } from "@drewpackages/host-common";
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "shared/model/hooks";
import { getDeploymentStatus } from "../api/deploymentStatus";
import {
  selectDappDeploymentInfo,
  selectDappDeploymentRequestStatus,
} from "../model/slice";
import { Button, Space, Spin, Typography } from "antd";
import { deploy } from "../api/deploy";

interface IDappActionProps {
  dappId: string;
  dump?: FormulaExecutionDump;
}

export function DappActions({ dappId, dump }: IDappActionProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDeploymentStatus({ dappId }));

    const interval = setInterval(() => getDeploymentStatus({ dappId }), 2000);
    return () => clearInterval(interval);
  }, [dappId, dispatch]);

  const isDeployRequestInFlight = useAppSelector(
    selectDappDeploymentRequestStatus
  );

  const { isDeploymentLoading, isDeployed } = useAppSelector(
    selectDappDeploymentInfo
  );

  const onClick = useCallback(() => {
    if (dump) {
      dispatch(deploy({ dappId, dump }));
    }
  }, [dappId, dump, dispatch]);

  if (isDeploymentLoading || dump == null) {
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
    <Button type={isDeployed ? "dashed" : "primary"} onClick={onClick}>
      {isDeployed ? "Redeploy" : "Deploy"}
    </Button>
  );
}