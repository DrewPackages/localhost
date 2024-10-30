import {
  CaretRightOutlined,
  DeleteOutlined,
  FullscreenOutlined,
  PauseOutlined,
} from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
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
        <Tooltip title="Open">
          <Button
            type="text"
            icon={<FullscreenOutlined />}
            onClick={onOpenClick}
          />
        </Tooltip>
      )}
      {status === "running" && (
        <Tooltip title="Pause">
          <Button type="text" icon={<PauseOutlined />} onClick={onPauseClick} />
        </Tooltip>
      )}
      {status === "paused" && (
        <Tooltip title="Start">
          <Button
            type="text"
            icon={<CaretRightOutlined />}
            onClick={onStartClick}
          />
        </Tooltip>
      )}
      {status !== "deleted" && (
        <Tooltip title="Delete">
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={onDeleteClick}
          />
        </Tooltip>
      )}
    </Space>
  );
};
