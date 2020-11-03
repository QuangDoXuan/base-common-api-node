import { createConnection, getConnection } from 'typeorm';
import { app } from '../src/index';
import http from 'http';
import config from '../src/config';


const server = http.createServer(app);

createConnection()
  .then(async () => { })
  .catch(error => console.log(error));

server.listen(config.port, function () {
  console.log(`Server running on port ${config.port}`);
});

export { server };

