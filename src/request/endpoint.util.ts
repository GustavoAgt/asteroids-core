export const BASE_URI = "https://api.nasa.gov/neo/rest/v1";
export const GENERAL = "/neo/browse?api_key=DEMO_KEY";
("https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=DEMO_KEY");

export const getUriBetweenDate = (date1: string, data2: string) => {
  return `/feed?start_date=${date1}&end_date=${data2}&api_key=DEMO_KEY`;
};
