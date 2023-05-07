import axios from "axios";
import { NeoResult } from "../types/neo.type";
import { BASE_URI } from "../request/endpoint.util";

export const fetchNeosServ = async (endpoint: string) => {
  const data = await axios.get<NeoResult>(`${BASE_URI}${endpoint}`);
  return data;
};