import * as http from 'node:http';
import * as dotenv from 'dotenv';

import router from './routing';

dotenv.config();

const PORT = process.env.PORT || 5001;

const server = http.createServer(async (req, res) => {
  router({ req, res });
});

server.listen(PORT, (err?: Error) => {
  if (err) {
    console.error(err);
  }
  console.log(`listening on port ${PORT}`);
});
