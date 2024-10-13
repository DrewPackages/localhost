import { Image, Space, Typography } from "antd";
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
      <Image
        height={56}
        preview={false}
        src={imageUrl}
        alt={name}
        onClick={onClick}
      />
      {name && <Typography.Text onClick={onClick}>{name}</Typography.Text>}
    </Space>
  );
};
