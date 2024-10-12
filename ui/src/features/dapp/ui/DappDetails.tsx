import { useAppDispatch, useAppSelector } from "shared/model/hooks";
import { selectDappInfo, selectDappInfoIsLoading } from "../model/slice";
import { Affix, Card, Space, Spin, Tag, Typography } from "antd";
import { useEffect, useState } from "react";
import { getDappInfo } from "../api/dappInfo";
import { DappIcon } from "entities/dapp";
import { DappActions } from "./DappAction";

interface IDappDetailsProps {
  dappId: string;
}

export const DappDetails = ({ dappId }: IDappDetailsProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDappInfo({ dappId }));
  }, [dappId, dispatch]);

  const isDappLoading = useAppSelector(selectDappInfoIsLoading);
  const dappInfo = useAppSelector(selectDappInfo);

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
          <DappActions dappId={dappId} dump={dappInfo.dump} />
        </Card>
      </Affix>
    </>
  );
};
