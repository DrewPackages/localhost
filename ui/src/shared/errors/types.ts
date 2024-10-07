import React from "react";

export interface IDisplayableError {
  label: string;
  content?: React.ReactNode;
  level: "error" | "warning";
}

export function isDisplayableError(err: unknown) {
  return (
    err != null && typeof err === "object" && "label" in err && "level" in err
  );
}

export interface IErrorDisplay {
  display(err: IDisplayableError): void;
}
