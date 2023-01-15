import { IncomingMessage, ServerResponse } from 'http';

export const collectRequestData = <T>(
  req: IncomingMessage,
  res: ServerResponse,
  callback: (body: T) => void,
) => {
  const chunks = [];

  req.on('data', (chunk) => {
    chunks.push(chunk);
  });

  req.on('end', () => {
    try {
      const body = JSON.parse(Buffer.concat(chunks).toString());
      callback(body);
    } catch (error) {
      res.statusCode = 500;
      res.end('Unexpected server error');
    }
  });
};
