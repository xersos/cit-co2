import {
    RETRIEVE_ALL_SENSOR_VALUES,
    DELETE_SENSOR_VALUES
  } from "./types";
  
  import SensorValuesDataService from "../services/sensor-values.service";
  
  export const retrieveSensorValues = () => async (dispatch) => {
    try {
      const res = await SensorValuesDataService.getAll();
      console.log(res.data);
  
      dispatch({
        type: RETRIEVE_ALL_SENSOR_VALUES,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const deleteSensorValues = (id) => async (dispatch) => {
    try {
      await SensorValuesDataService.delete(id);
  
      dispatch({
        type: DELETE_SENSOR_VALUES,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };