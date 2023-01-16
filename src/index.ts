import * as http from 'http';
import * as dotenv from 'dotenv';

import router from './routing';

dotenv.config();

const PORT = process.env.PORT || 5001;

const server = http.createServer(async (req, res) => {
  router({ req, res });
});

if (require.main === module) {
  server.listen(PORT, (err?: Error) => {
    if (err) {
      console.error(err);
    }
    console.log(`listening on port ${PORT}`);
  });
}

export default server;
