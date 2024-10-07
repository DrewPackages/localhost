import { IDisplayableError } from "./types";

export class InvalidStatusError extends Error implements IDisplayableError {
  get label(): string {
    return this.message;
  }
  get level(): "error" | "warning" {
    return "error";
  }

  constructor(status: number) {
    super(`Unexpected http status ${status}`);
  }
}

export class TimeoutError extends Error implements IDisplayableError {
  get label(): string {
    return this.message;
  }
  get level(): "error" | "warning" {
    return "error";
  }

  constructor() {
    super("Request timed out. Check your network connectivity");
  }
}

export class CustomError extends Error implements IDisplayableError {
  get label(): string {
    return this.message;
  }
  get level(): "error" | "warning" {
    return "error";
  }
}
