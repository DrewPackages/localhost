import { Image, Space, SpaceProps, Typography } from "antd";
import React from "react";

interface IDappIconProps {
  imageUrl: string;
  name?: string;
  active?: boolean;
  onClick?: () => void;
  direction?: SpaceProps["direction"];
}

export const DappIcon = ({
  active,
  imageUrl,
  name,
  onClick,
  direction = "vertical",
}: IDappIconProps) => {
  return (
    <Space
      direction={direction}
      className="flex justify-center"
      classNames={{ item: "self-center" }}
      size={direction === "horizontal" ? "middle" : undefined}
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
