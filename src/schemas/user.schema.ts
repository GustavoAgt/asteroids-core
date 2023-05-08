import { createSchema } from "graphql-yoga";
import {
  fetchNeos,
  fetchNeosBetweenDates,
} from "../resolvers/asteroid.resolver";
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

    type Kilometers {
      estimated_diameter_min: Float
      estimated_diameter_max: Float
    }

    type Diameter {
      kilometers: Kilometers
    }

    type RelativeVelocity {
      kilometers_per_second: Float
      kilometers_per_hour: Float
      miles_per_hour: Float
    }

    type ApproachInfo {
      close_approach_date: String
      close_approach_date_full: String
      epoch_date_close_approach: String
      relative_velocity: RelativeVelocity
      orbiting_body: String
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
      estimated_diameter: Diameter
      close_approach_data: [ApproachInfo]
      orbiting_body: String
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
        return await fetchNeosBetweenDates(dates.from, dates.until);
      },
    },
  },
});

export { schema };
