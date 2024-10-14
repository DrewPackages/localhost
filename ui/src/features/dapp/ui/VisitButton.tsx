import { useAppDispatch, useAppSelector } from "shared/model/hooks";
import { selectDappDeploymentPorts } from "../model/slice";
import { Button, Dropdown } from "antd";
import { useCallback, useEffect, useState } from "react";
import { getPorts } from "../api/getPorts";
import service from "localhostService";

interface IVisitButtonProps {
  dappId: string;
}

export function VisitButton({ dappId }: IVisitButtonProps) {
  const [enabled, setEnabled] = useState(true);
  const dispatch = useAppDispatch();
  const { isPortsLoading, deploymentPorts } = useAppSelector(
    selectDappDeploymentPorts
  );

  const onVisitClick = useCallback(
    async (port: number) => {
      setEnabled(false);
      try {
        const { shell } = require("electron");
        await shell.openExternal(`http://localhost:${port}`);
      } finally {
        setEnabled(true);
      }
    },
    [setEnabled]
  );

  useEffect(() => {
    dispatch(getPorts({ dappId }));

    const interval = setInterval(() => dispatch(getPorts({ dappId })), 10000);

    return () => clearInterval(interval);
  }, [dispatch, dappId]);

  if (
    isPortsLoading ||
    deploymentPorts == null ||
    deploymentPorts.length === 0
  ) {
    return <></>;
  }

  if (deploymentPorts.length === 1) {
    return <Button disabled={!enabled}>Visit</Button>;
  }

  const menuOptions = deploymentPorts.map(({ name, port }, i) => ({
    key: i,
    label: name,
    onclick: () => onVisitClick(port),
    disabled: !enabled,
  }));

  return (
    <Dropdown.Button
      onClick={() => onVisitClick(deploymentPorts[0].port)}
      menu={{ items: menuOptions }}
      disabled={!enabled}
    >
      Visit
    </Dropdown.Button>
  );
}
