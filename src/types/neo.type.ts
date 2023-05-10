export type Neo = {
  links: { self: string };
  id: string;
  neo_reference_id: string;
  name: string;
  name_limited: string;
  designation: number;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  is_potentially_hazardous_asteroid: boolean;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  close_approach_data: {
    close_approach_date: string;
    close_approach_date_full: string;
    epoch_date_close_approach: string;
    relative_velocity: {
      kilometers_per_second: number;
      kilometers_per_hour: number;
      miles_per_hour: number;
    };

    miss_distance: {
      astronomical: number;
      lunar: number;
      kilometers: number;
      miles: number;
    };

    orbiting_body: string;
  }[];
};
export type NeoResult = {
  near_earth_objects: Neo[];
};
