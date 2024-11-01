import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "shared/model/hooks";
import { fetch } from "../api/fetch";
import { selectAppVersion, selectAppVersionLoading } from "../model/slice";
import { Typography } from "antd";

export const AppVersion: FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectAppVersionLoading);
  const appVersion = useAppSelector(selectAppVersion);

  useEffect(() => {
    dispatch(fetch());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Typography.Text type="secondary">
      Drew Localhost{isLoading ? "" : ` v${appVersion}`}
    </Typography.Text>
  );
};
