import express, { Express } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { ConfigRouter } from "./routers";

class App {
  private static _instance: App;
  private readonly app: Express = express();
  private CURRENT_ENV =
    process.env.NODE_ENV === "production" ? undefined : false;

  private constructor() {
    this.app.use(
      helmet({
        contentSecurityPolicy: this.CURRENT_ENV,
        crossOriginResourcePolicy: this.CURRENT_ENV,
        crossOriginEmbedderPolicy: this.CURRENT_ENV,
      })
    );
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(new ConfigRouter().autoConfig("routes"));
  }

  public getApp(): Express {
    return this.app;
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
}

export default App;
