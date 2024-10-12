import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { isBackButtonLocationState } from "../model/types";

export function BackButton() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const backState = state?.back;

  if (isBackButtonLocationState(backState)) {
    return (
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(backState.backUrl)}
      />
    );
  }

  return <></>;
}
