export type Neo = {
  links: { self: String };
  id: String;
  neo_reference_id: String;
  name: String;
  name_limited: String;
  designation: Number;
  nasa_jpl_url: String;
  absolute_magnitude_h: Number;
  is_potentially_hazardous_asteroid: Boolean;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: Number;
      estimated_diameter_max: Number;
    };
  };
  close_approach_data: {
    close_approach_date: String;
    close_approach_date_full: String;
    epoch_date_close_approach: String;
    relative_velocity: {
      kilometers_per_second: Number;
      kilometers_per_hour: Number;
      miles_per_hour: Number;
    };

    miss_distance: {
      astronomical: Number;
      lunar: Number;
      kilometers: Number;
      miles: Number;
    };

    orbiting_body: String;
  }[];
};
export type NeoResult = {
  near_earth_objects: Neo[];
};
