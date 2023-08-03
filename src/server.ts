/* eslint-disable no-console */
import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";
import { Server } from "http";

//handling uncaught exception
process.on("uncaughtException", error => {
  console.log(error);
  process.exit(1);
});

let server: Server;

async function bootsrtap() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("✅ database connected successfully");

    app.listen(config.port, () => {
      console.log(`🦻 Application listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(`❌ Failed to connect database: ${error}`);
  }

  //gracefully off/terminate the server
  process.on("unhandledRejection", error => {
    console.log("Unhandled rejection detected, we are closing our server...");
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootsrtap();

//terminate the server with signal
process.on("SIGTERM", () => {
  console.log("SIGTERM is received. we are colsing our server");
  if (server) {
    server.close();
  }
});
