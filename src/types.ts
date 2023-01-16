import { IncomingMessage, ServerResponse } from 'http';

export interface RequestInfo {
  method: string;
  path: string;
}

export type Handler = (req: IncomingMessage, res: ServerResponse) => void;

export interface Routing {
  [key: string]: Map<RequestInfo, Handler>;
}
