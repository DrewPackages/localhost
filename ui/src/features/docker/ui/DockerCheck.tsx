import React, { PropsWithChildren, useCallback, useEffect } from "react";
import { Spin, Button, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "shared/model/hooks";
import { selectDockerAvailability } from "../model/slice";
import { checkDockerAvailability } from "../api/check";
import service from "localhostService";

export const DockerCheck: React.FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { available: isDockerAvailable } = useAppSelector(
    selectDockerAvailability
  );

  useEffect(() => {
    dispatch(checkDockerAvailability());
    const intervalId = setInterval(() => {
      if (isDockerAvailable !== false) {
        dispatch(checkDockerAvailability());
      }
    }, 30000);
    return () => clearInterval(intervalId);
  }, [dispatch, isDockerAvailable]);

  const checkAgainClickHandler = useCallback(() => {
    if (isDockerAvailable === false) {
      dispatch(checkDockerAvailability());
    }
  }, [isDockerAvailable, dispatch]);

  if (isDockerAvailable === true) {
    return <>{children}</>;
  }

  if (isDockerAvailable === false) {
    return (
      <div className="flex justify-around items-center h-screen w-screen flex-col">
        <div>
          <Typography.Title level={3} className="text-3xl font-bold mb-6">
            Ooops! We can't connect the docker
          </Typography.Title>
          <div className="flex justify-center items-center w-full h-full flex-col">
            <Button onClick={checkAgainClickHandler}>Try again</Button>
            <Button
              type="link"
              onClick={() =>
                service.openUrlInBrowser({
                  win32:
                    "https://docs.docker.com/desktop/install/windows-install/",
                  darwin:
                    "https://docs.docker.com/desktop/install/mac-install/",
                  default:
                    "https://docs.docker.com/desktop/install/windows-install/",
                })
              }
              className="mt-3"
            >
              Or install it
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-around items-center h-screen w-screen flex-col">
      <div>
        <Typography.Title level={3} className="text-3xl font-bold mb-6">
          Checking your docker
        </Typography.Title>
        <div className="flex justify-center items-center w-full h-full">
          <Spin size="large" />
        </div>
      </div>
    </div>
  );
};
