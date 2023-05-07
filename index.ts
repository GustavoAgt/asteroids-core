import "dotenv/config";
import express, { Express } from "express";
import App from "./src/app";

const instance: App = App.Instance;
const app: Express = instance.getApp();

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {  
  console.log(
    `⚡️[server]: Asteroids Look up is running at http://localhost:${PORT}`
  );
});
