export type DappMarketplaceDescription = {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  categories: Array<string>;
  installed?: boolean;
};

export type StdoutOutputSpec = {
  type: "stdout";
};
export type StderrOutputSpec = {
  type: "stderr";
};
export type RegexOutputSpec = {
  type: "regex";
  stream?: "stdout" | "stderr";
  expr: RegExp | string;
  groupName: string;
};
export type OutputExtract =
  | RegexOutputSpec
  | StdoutOutputSpec
  | StderrOutputSpec;

export type ScheduleOutput = {
  type: "scheduler-output";
  id: string;
  extract?: OutputExtract;
};

export type TaskStageInstruction = {
  type: "task";
  outputs: Array<Pick<ScheduleOutput, "id" | "extract">>;
  interactive?: boolean;
};
export type OffchainStageInstruction = {
  type: "offchain";
  dind?: boolean;
};
export type StageInstructionCommon = {
  workdir: ValueOrOutput<string>;
  image: string;
  cmd: Array<ValueOrOutput<string>>;
  envs: Record<string, ValueOrOutput<string>>;
};
export type StageInstruction = (
  | TaskStageInstruction
  | OffchainStageInstruction
) &
  StageInstructionCommon;
export type ValueOrOutput<T> = T | ScheduleOutput;

export interface FormulaExecutionDump {
  config: {
    storage: Record<string, any>;
  };
  state: {
    outputIds: Array<string>;
    resolvedValues: Record<string, any>;
  };
  instructions: Array<StageInstruction>;
  executedSteps: number;
  formulaName: string;
}
