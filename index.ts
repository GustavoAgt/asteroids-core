import express, { Express } from "express";
import App from "./src/app";
import "dotenv/config";

const instance: App = App.Instance;
const app: Express = instance.getApp();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
