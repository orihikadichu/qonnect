import app from './server/app';
import http from 'http';
import db from './models';

const port = process.env.PORT || 3001;
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Example app listening on port ${server.address().port}`);
});

process.on('SIGINT', () => {
  console.info('SIGINT signal received.');

  // Stops the server from accepting new connections and finishes existing connections.
  server.close(function(err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    db.sequelize.close(function () {
      console.log('Sequelize connection disconnected');
      process.exit(0);
    });
  });
});
