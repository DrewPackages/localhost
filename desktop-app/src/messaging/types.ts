export type PreloadRegisterRequest = {
  channelName: string;
  methodNames: Array<string>;
};

export type RequestFromRenderer = {
  method: string;
  args: Array<any>;
};
