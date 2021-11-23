import {
    RETRIEVE_ALL_SENSOR_VALUES,
    DELETE_SENSOR_VALUES,
  } from "../actions/types";
  
  const initialState = [];
  
  function sensorValuesReducer(sensorValues = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
  
      case RETRIEVE_ALL_SENSOR_VALUES:
        return payload;
  
      case DELETE_SENSOR_VALUES:
        return sensorValues.filter(({ id }) => id !== payload.id);
  
      default:
        return sensorValues;
    }
  };
  
  export default sensorValuesReducer;