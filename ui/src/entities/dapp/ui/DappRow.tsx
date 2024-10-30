import { Col, Row, Space, Tag } from "antd";
import { FC } from "react";
import { DappIcon } from "./DappIcon";
import { CaretRightOutlined, PauseOutlined } from "@ant-design/icons";
import { ActionsMini } from "./ActionsMini";

interface DappRowProps {
  id: string;
  name: string;
  logoUrl: string;
  categories: Array<string>;
  state: "running" | "paused" | "deleted";
  onOpenClick?: (dappId: string) => void;
  onPauseClick?: (dappId: string) => void;
  onStartClick?: (dappId: string) => void;
  onDeleteClick?: (dappId: string) => void;
}

const MAX_CATEGORY_TAGS_COUNT = 3;

export const DappRow: FC<DappRowProps> = ({
  id,
  logoUrl,
  name,
  categories,
  state,
  onDeleteClick,
  onOpenClick,
  onPauseClick,
  onStartClick,
}) => {
  return (
    <Row className="w-full" align="middle">
      <Col xl={{ span: 4 }} xs={6}>
        <DappIcon imageUrl={logoUrl} name={name} direction="horizontal" />
      </Col>
      <Col xl={{ span: 3 }} xs={5}>
        <Tag
          color={state === "running" ? "green" : undefined}
          icon={
            state === "paused" ? (
              <PauseOutlined />
            ) : state === "running" ? (
              <CaretRightOutlined />
            ) : undefined
          }
        >
          {state}
        </Tag>
      </Col>
      <Col xl={{ span: 9 }} xs={{ span: 4, offset: 2 }}>
        <Space>
          {categories
            .slice(0, Math.min(categories.length, MAX_CATEGORY_TAGS_COUNT))
            .map((category, index) => (
              <Tag key={index}>{category}</Tag>
            ))}
          {categories.length > MAX_CATEGORY_TAGS_COUNT && (
            <Tag>+ {categories.length - MAX_CATEGORY_TAGS_COUNT}</Tag>
          )}
        </Space>
      </Col>
      <Col xl={{ span: 2, offset: 4 }} xs={{ span: 3, offset: 2 }}>
        <ActionsMini
          status={state}
          onDeleteClick={() => onDeleteClick?.(id)}
          onPauseClick={() => onPauseClick?.(id)}
          onStartClick={() => onStartClick?.(id)}
          onOpenClick={() => onOpenClick?.(id)}
        />
      </Col>
    </Row>
  );
};
