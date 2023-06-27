import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { Server } from 'http';

//uncaught exception handling ---this is for synchronous term
process.on('uncaughtException', err => {
  console.log(err);
  process.exit(1);
});

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('✅ Database Connected');

    server = app.listen(config.port, () => {
      console.log(`Application listening on port ${config.port}`);
    });
  } catch (err) {
    console.log('❌ Failed to Connect', err);
  }

  //handle unhandled rejection error handling ---this is for asynchronous api request
  process.on('unhandledRejection', err => {
    if (server) {
      server.close(() => {
        console.log(err);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

//Signal termination
process.on('SIGTERM', () => {
  console.log('SIGTERM is received');
  if (server) {
    server.close();
  }
});
