import { createSchema } from "graphql-yoga";
import {
  fetchBookmarkedNeos,
  fetchNeos,
  fetchNeosBetweenDates,
  saveNeoBookmarked,
} from "../resolvers/asteroid.resolver";
import { GENERAL } from "../request/endpoint.util";

const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      asteroids: [Neo!]!
      neoBetweenDates(from: String!, until: String!): [Neo!]!
      bookmarkedNeos: [Neo!]!
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

    type Mutation {
      saveAsteroid(id: String!): Neo!
    }
  `,

  resolvers: {
    Query: {
      asteroids: async () => {
        const data = await fetchNeos(GENERAL);
        return data?.near_earth_objects;
      },

      neoBetweenDates: async (_, args) => {
        const { from, until } = args;
        return await fetchNeosBetweenDates(from, until);
      },

      bookmarkedNeos: async () => {
        return await fetchBookmarkedNeos();
      },
    },

    Mutation: {
      saveAsteroid: async (_: unknown, args: { id: string }) => {
        return await saveNeoBookmarked(args.id);
      },
    },
  },
});

export { schema };
