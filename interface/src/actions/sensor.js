import {
    CREATE_SENSOR,
    RETRIEVE_SENSOR,
    RETRIEVE_ALL_SENSORS,
    UPDATE_SENSOR,
    DELETE_SENSOR
  } from "./types";
  
  import SensorDataService from "../services/sensor.service";
  
  export const createSensor = (name) => async (dispatch) => {
    try {
      const res = await SensorDataService.create({ name });
  
      dispatch({
        type: CREATE_SENSOR,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  export const retrieveSensor = () => async (dispatch) => {
    try {
      const res = await SensorDataService.findOne();
  
      dispatch({
        type: RETRIEVE_SENSOR,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const retrieveSensors = () => async (dispatch) => {
    try {
      const res = await SensorDataService.getAll();
      console.log(res.data);
  
      dispatch({
        type: RETRIEVE_ALL_SENSORS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateSensor = (id, data) => async (dispatch) => {
    try {
      const res = await SensorDataService.update(id, data);
  
      dispatch({
        type: UPDATE_SENSOR,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteSensor = (id) => async (dispatch) => {
    try {
      await SensorDataService.delete(id);
  
      dispatch({
        type: DELETE_SENSOR,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };