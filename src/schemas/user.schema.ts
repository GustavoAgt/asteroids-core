import { createSchema } from "graphql-yoga";

const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      user: String!
      hello: String!
    }

    type User {
      name: String!
      lastname: String!
    }
  `,
  resolvers: {
    Query: {
      hello: () => "Hello from Yoga!",
    },
  },
});

export { schema };
