export interface BackButtonLocationState {
  backUrl: string;
}

export function isBackButtonLocationState(
  o: any
): o is BackButtonLocationState {
  return (
    typeof o === "object" && "backUrl" in o && typeof o.backUrl === "string"
  );
}
