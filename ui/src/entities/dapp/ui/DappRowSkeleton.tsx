import { Col, Row, Skeleton, SkeletonProps, Space } from "antd";
import { FC } from "react";

export const DappRowSkeleton: FC<SkeletonProps> = (props) => {
  return (
    <Row align="middle" className="w-full">
      <Col span={4}>
        <Skeleton.Avatar {...props} />
      </Col>
      <Col span={3}>
        <Skeleton.Input size="small" />
      </Col>
      <Col span={9}>
        <Space>
          <Skeleton.Input size="small" />
          <Skeleton.Input size="small" />
          <Skeleton.Input size="small" />
        </Space>
      </Col>
      <Col offset={4} span={4}>
        <Space>
          <Skeleton.Button shape="circle" size="small" />
          <Skeleton.Button shape="circle" size="small" />
          <Skeleton.Button shape="circle" size="small" />
        </Space>
      </Col>
    </Row>
  );
};
