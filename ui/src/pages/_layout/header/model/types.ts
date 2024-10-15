export type BackButtonLocationState =
  | {
      url: string;
    }
  | { navigateBack: boolean };

export function isBackButtonLocationState(
  o: any
): o is BackButtonLocationState {
  return (
    typeof o === "object" &&
    (("url" in o && typeof o.url === "string") ||
      ("navigateBack" in o && typeof o.navigateBack === "boolean"))
  );
}
