import { getUriBetweenDate } from "../request/endpoint.util";
import { fetchNeosServ } from "../services/asteroid-fetcher.service";
import { Neo, NeoResult } from "../types/neo.type";

export const fetchNeos = async (
  endpoint: string
): Promise<NeoResult | undefined> => {
  let data = null;
  try {
    data = await fetchNeosServ(endpoint);
  } catch (error) {
    console.log(error);
  }

  return data?.data;
};

export const fetchNeosBetweenDates = async (date1: any, date2: any) => {
  const arr: Neo[] = [];
  try {
    const data = await fetchNeos(getUriBetweenDate(date1, date2));

    for (let key in data?.near_earth_objects) {
      arr.push(data?.near_earth_objects[key as any]);
    }
  } catch (error) {}

  return arr.flat();
};
