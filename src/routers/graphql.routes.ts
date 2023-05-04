import { Router } from "express";
import { schema } from "../schemas/user.schema";
import { createYoga } from "graphql-yoga";

const router = Router();

const yoga = createYoga({ schema: schema, graphiql: true });
router.use("", yoga);

export { router };
