import { createSchema } from "graphql-yoga";
import { fetchNeos } from "../resolvers/asteroid.resolver";
import { GENERAL, getUriBetweenDate } from "../request/endpoint.util";
import { Neo } from "../types/neo.type";

//@ts-ignore
import format from "date-format";

const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      asteroids: [Neo!]!
      neoBetweenDates(from: String!, until: String!): [Neo!]!
    }

    type Neo {
      id: Int
      neo_reference_id: Int
      name: String
      name_limited: String
      designation: Int
      nasa_jpl_url: String
      absolute_magnitude_h: Float
      is_potentially_hazardous_asteroid: Boolean
    }

    type Dates {
      from: String!
      until: String!
    }
  `,
  resolvers: {
    Query: {
      asteroids: async () => {
        const data = await fetchNeos(GENERAL);
        return data?.near_earth_objects;
      },

      neoBetweenDates: async (...[_, dates]) => {
        const arr: Neo[] = [];
        
        try {
          const fromFomatted = format("yyyy-MM-dd", new Date(dates.from));
          const untilFomatted = format("yyyy-MM-dd", new Date(dates.from));
          const data = await fetchNeos(
            getUriBetweenDate(fromFomatted, untilFomatted)
          );
          
          for (let key in data?.near_earth_objects) {
            arr.push(data?.near_earth_objects[key as any]);
          }
        } catch (error) {}

        return arr.flat();
      },
    },
  },
});

export { schema };
