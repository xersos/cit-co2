import {
    CREATE_SENSOR,
    RETRIEVE_ALL_SENSORS,
    RETRIEVE_SENSOR,
    UPDATE_SENSOR,
    DELETE_SENSOR,
  } from "../actions/types";
  
  const initialState = [];
  
  function sensorReducer(sensors = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_SENSOR:
        return [...sensors, payload];
  
      case RETRIEVE_ALL_SENSORS:
        return payload;

      case RETRIEVE_SENSOR:
          return sensors.filter(({ id }) => id !== payload.id);
  
      case UPDATE_SENSOR:
        return sensors.map((sensor) => {
          if (sensor.id === payload.id) {
            return {
              ...sensor,
              ...payload,
            };
          } else {
            return sensor;
          }
        });
  
      case DELETE_SENSOR:
        return sensors.filter(({ id }) => id !== payload.id);
  
      default:
        return sensors;
    }
  };
  
  export default sensorReducer;