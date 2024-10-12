import { useContext, useEffect } from "react";
import { IDisplayableError, isDisplayableError } from "./types";
import { ErrorDisplay } from "./provider";

type UseErrorDisplayParam<T> = { isError?: boolean } & (
  | {
      err?: T;
      mapper: (
        m: Exclude<NonNullable<T>, IDisplayableError>
      ) => IDisplayableError;
    }
  | {
      err?: IDisplayableError;
    }
);

function isErrorRised<T>(param: UseErrorDisplayParam<T>): boolean {
  if ("isError" in param && param.isError != null) {
    return param.isError;
  }
  return Boolean(param.err);
}

export function useErrorDisplay<T>(param: UseErrorDisplayParam<T>): void {
  const errors = useContext(ErrorDisplay);

  useEffect(() => {
    if ("err" in param && param.err && isErrorRised(param)) {
      if (!isDisplayableError(param.err)) {
        if ("mapper" in param) {
          errors.display(
            param.mapper(
              param.err as Exclude<NonNullable<T>, IDisplayableError>
            )
          );
        } else {
          throw new Error("Mapper for custom error not provided");
        }
      } else {
        errors.display(param.err as IDisplayableError);
      }
    }
  }, [errors, param]);
}
