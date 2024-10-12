import { Avatar, Space, Typography } from "antd";
import React from "react";

interface IDappIconProps {
  imageUrl: string;
  name?: string;
  active?: boolean;
  onClick?: () => void;
}

export const DappIcon = ({
  active,
  imageUrl,
  name,
  onClick,
}: IDappIconProps) => {
  return (
    <Space
      direction="vertical"
      className="flex justify-center"
      classNames={{ item: "self-center" }}
    >
      <Avatar
        shape="square"
        size="large"
        src={imageUrl}
        style={{ backgroundColor: !active ? "gray" : undefined }}
        onClick={onClick}
      />
      {name && <Typography.Text onClick={onClick}>{name}</Typography.Text>}
    </Space>
  );
};
