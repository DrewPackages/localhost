import { useEffect, useState } from "react";
import { useAppDispatch } from "shared/model/hooks";
import { selectDapp } from "../model/slice";
import { DappMarketplaceDescription } from "entities/dapp";

export function useSelectDapp() {
  const dispatch = useAppDispatch();

  const [dapp, setDapp] = useState<DappMarketplaceDescription | undefined>();

  const [lock, setLock] = useState<undefined | boolean>();

  useEffect(() => {
    if (dapp != null && lock !== true) {
      dispatch(selectDapp(dapp));
      setLock(true);
    }
  }, [dapp, lock, setLock, dispatch]);

  return setDapp;
}
