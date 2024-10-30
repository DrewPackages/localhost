import {
  ConfigStorage,
  FormulaExecutionDump,
  GitHubFetcher,
  OffchainExecutor,
  StateStorage,
  TaskExecutor,
} from "@drewpackages/host-common";
import { FORMULAS_DIR, getFormulaPath } from "./fetcher";

export class DumpDeployerService {
  async executeDump(
    dump: FormulaExecutionDump
  ): Promise<FormulaExecutionDump["state"]> {
    const state = new StateStorage();
    dump && state.fromDump(dump.state);
    const config = new ConfigStorage();
    dump && config.fromDump(dump.config);
    const fetcher = new GitHubFetcher(FORMULAS_DIR);
    await fetcher.fetchFormulaFileText(dump.formulaName, "formula.js");
    const instructions = dump.instructions;

    const tasks = new TaskExecutor(state, getFormulaPath);
    const offchain = new OffchainExecutor(state, getFormulaPath);

    const formulaNameWithoutRev = dump.formulaName.replace(/\@.+/, "");

    for (
      let index = dump?.executedSteps || 0;
      index < instructions.length;
      index++
    ) {
      const instruction = instructions[index];
      if (instruction.type === "task") {
        const outputs = await tasks.runStage(
          formulaNameWithoutRev,
          instruction
        );
        state.addResolvedValues(outputs);
      }
      if (instruction.type === "offchain") {
        const outputs = await offchain.runStage(
          formulaNameWithoutRev,
          instruction
        );
        state.addResolvedValues(outputs);
      }
    }

    return state.toDump();
  }
}
