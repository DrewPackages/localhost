import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { To, useLocation, useNavigate } from "react-router-dom";
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
        onClick={() =>
          navigate(("navigateBack" in backState ? -1 : backState.url) as To)
        }
      />
    );
  }

  return <></>;
}
