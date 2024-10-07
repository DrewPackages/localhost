import { IDisplayableError } from "../types";

export type TOpts = {
  label: string;
  level: IDisplayableError["level"];
};

export type TMapper<O extends Partial<TOpts>, T> = (
  opts: O
) => (err: T) => IDisplayableError;
