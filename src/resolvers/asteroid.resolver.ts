import { fetchNeosServ } from "../services/asteroid-fetcher.service";
import { NeoResult } from "../types/neo.type";

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
