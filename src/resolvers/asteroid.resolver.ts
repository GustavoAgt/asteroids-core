import { getUriBetweenDate } from "../request/endpoint.util";
import {
  fetchDBNeosServ,
  fetchNeosServ,
  saveBookmarkedNeoServ,
} from "../services/asteroid-fetcher.service";
import { Neo, NeoResult } from "../types/neo.type";

export const fetchNeos = async (
  endpoint: string
): Promise<NeoResult | undefined> => {
  let data = null;
  try {
    data = await fetchNeosServ<NeoResult>(endpoint);
  } catch (error) {
    console.log(error);
  }

  return data?.data;
};

const fetchNeo = async (endpoint: string): Promise<Neo | undefined> => {
  let data = null;
  try {
    data = await fetchNeosServ<Neo>(endpoint);
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

export const saveNeoBookmarked = async (id: string) => {
  try {
    const data = await fetchNeo(`/neo/${id}?api_key=DEMO_KEY`);
    return await saveBookmarkedNeoServ(data);
  } catch (error) {
    console.log(error)
  }
};

export const fetchBookmarkedNeos = async () => {
  try {
    return await fetchDBNeosServ();
  } catch (error) {}
};
