import { useAppDispatch, useAppSelector } from "shared/model/hooks";
import {
  selectDappDeploymentInfo,
  selectDappDeploymentPorts,
  selectDappDeploymentRequestStatus,
  selectDappInfo,
  selectDappInfoIsLoading,
  DappActions,
  getDeploymentStatus,
  getPorts,
  deploy,
  DappIcon,
  getDappInfo,
} from "../../../entities/dapp";
import { Affix, Card, Space, Spin, Tag, Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IDappDetailsProps {
  dappId: string;
}

export const DappDetails = ({ dappId }: IDappDetailsProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDappInfo({ dappId }));
  }, [dappId, dispatch]);

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

  const isDappLoading = useAppSelector(selectDappInfoIsLoading);
  const dappInfo = useAppSelector(selectDappInfo);

  const isDeployRequestInFlight = useAppSelector(
    selectDappDeploymentRequestStatus
  );

  const { isDeploymentLoading, isDeployed } = useAppSelector(
    selectDappDeploymentInfo
  );
  const { deploymentPorts } = useAppSelector(selectDappDeploymentPorts);

  const onDeployClick = useCallback(() => {
    if (dappInfo?.dump && dappInfo.dump !== "not-provided") {
      dispatch(deploy({ dappId, dump: dappInfo.dump })).then(() =>
        dispatch(getPorts({ dappId }))
      );
    }
  }, [dappId, dappInfo?.dump, dispatch]);

  const navigate = useNavigate();

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

  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  if (isDappLoading || dappInfo == null) {
    return (
      <div className="flex justify-around items-center h-screen w-screen flex-col">
        <div>
          <Typography.Title level={3} className="text-3xl font-bold mb-6">
            Looking for your DApp
          </Typography.Title>
          <div className="flex justify-center items-center w-full h-full">
            <Spin size="large" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Space
        className="pl-6 h-screen w-screen"
        direction="vertical"
        size="middle"
        ref={setContainer}
      >
        <Space size="large" align="center">
          <DappIcon imageUrl={dappInfo.info.logoUrl} />
          <Typography.Title level={3}>{dappInfo.info.name}</Typography.Title>
        </Space>

        <Space wrap>
          {dappInfo.info.categories.map((category, i) => (
            <Tag key={i}>{category}</Tag>
          ))}
        </Space>

        <Typography.Paragraph className="mx-8">
          {dappInfo.info.description}
        </Typography.Paragraph>
      </Space>
      <Affix offsetBottom={90} target={() => container}>
        <Card className="w-full px-10">
          <Space>
            <DappActions
              dappId={dappId}
              dump={dappInfo.dump}
              isDeployRequestInFlight={isDeployRequestInFlight}
              isDeploymentLoading={isDeploymentLoading}
              isDeployed={isDeployed}
              deploymentPorts={deploymentPorts[dappId]}
              onDeployClick={onDeployClick}
              onOpenAddClick={onOpenAddClick}
            />
          </Space>
        </Card>
      </Affix>
    </>
  );
};
