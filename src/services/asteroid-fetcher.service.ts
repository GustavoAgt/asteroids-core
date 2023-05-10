import axios from "axios";
import { Neo } from "../types/neo.type";
import { BASE_URI } from "../request/endpoint.util";
import prisma from "../prisma/prisma";
import { Asteroid } from "@prisma/client";

export const fetchNeosServ = async <T>(endpoint: string) => {
  const data = await axios.get<T>(`${BASE_URI}${endpoint}`);
  return data;
};

export const saveBookmarkedNeoServ = async (asteroid: Neo | undefined) => {
  try {
    const newAsteroid = await prisma.asteroid.create({
      data: {
        id: Number(asteroid?.id),
        absoluteMagnitudeH: String(asteroid?.absolute_magnitude_h),
        name: asteroid?.name,
        nameLimited: asteroid?.name_limited,
        links: asteroid?.links,
        neoReferenceId: asteroid?.neo_reference_id,
        nasaJPLUrl: asteroid?.nasa_jpl_url,
        isPotentiallyHazardAst: asteroid?.is_potentially_hazardous_asteroid,
        closeApproachData: asteroid?.close_approach_data,
        estimatedDiameter: asteroid?.estimated_diameter,
        designation: Number(asteroid?.designation),
      },
    });

    console.log(newAsteroid);
  } catch (error) {
    console.log(error);
  }
};

export const fetchDBNeosServ = async () => {
  const neos = await prisma.asteroid.findMany();
  return neos;
};
