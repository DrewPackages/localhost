import {
  CaretRightOutlined,
  DeleteOutlined,
  FullscreenOutlined,
  PauseOutlined,
} from "@ant-design/icons";
import { Button, Space } from "antd";
import { FC } from "react";

interface ActionsMiniProps {
  status?: string;
  onOpenClick?: () => void;
  onPauseClick?: () => void;
  onStartClick?: () => void;
  onDeleteClick?: () => void;
}

export const ActionsMini: FC<ActionsMiniProps> = ({
  status,
  onDeleteClick,
  onOpenClick,
  onPauseClick,
  onStartClick,
}) => {
  return (
    <Space>
      {status === "running" && (
        <Button
          type="text"
          icon={<FullscreenOutlined />}
          onClick={onOpenClick}
        />
      )}
      {status === "running" && (
        <Button type="text" icon={<PauseOutlined />} onClick={onPauseClick} />
      )}
      {status === "paused" && (
        <Button
          type="text"
          icon={<CaretRightOutlined />}
          onClick={onStartClick}
        />
      )}
      {status !== "deleted" && (
        <Button type="text" icon={<DeleteOutlined />} onClick={onDeleteClick} />
      )}
    </Space>
  );
};
