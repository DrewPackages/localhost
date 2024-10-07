import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { TMapper, TOpts } from "./types";
import { SerializedError } from "@reduxjs/toolkit";

export function errorToText(
  error: FetchBaseQueryError | SerializedError | undefined
): string | undefined {
  if (!error) {
    return;
  }

  if ("message" in error) {
    return error.message;
  }

  if ("data" in error) {
    if (typeof error.data === "string") {
      return `${error.status} ${error.data}`;
    }
    if (
      typeof error.data === "object" &&
      error.data &&
      "error" in error.data &&
      typeof error.data.error === "string"
    ) {
      return `${error.status} ${error.data.error}`;
    }
  }
}

export const defaultErrorMapper: TMapper<
  Partial<TOpts> & Required<Pick<TOpts, "label">>,
  FetchBaseQueryError | SerializedError
> =
  ({ label, level = "error" }) =>
  (err) => ({
    label,
    level,
    content: errorToText(err),
  });
