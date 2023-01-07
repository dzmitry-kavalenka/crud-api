import http from 'node:http';

const PORT = process.env.PORT || 4000;

const server = http.createServer();

server.listen(PORT, (err?: Error) => {
  if (err) {
    console.error(err);
  }
  console.log(`listening on port ${PORT}`);
});
