import {
    CREATE_CLASSROOM,
    RETRIEVE_CLASSROOM,
    RETRIEVE_ALL_CLASSROOMS,
    RETRIEVE_CLASSROOM_BY_FILTER,
    UPDATE_CLASSROOM,
    DELETE_CLASSROOM
  } from "./types";
  
  import ClassroomDataService from "../services/classroom.service";
  
  export const createClassroom = (name, volume, sensor) => async (dispatch) => {
    try {
      const res = await ClassroomDataService.create({ name, volume, sensor });
  
      dispatch({
        type: CREATE_CLASSROOM,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  export const retrieveClassroom = () => async (dispatch) => {
    try {
      const res = await ClassroomDataService.findOne();
  
      dispatch({
        type: RETRIEVE_CLASSROOM,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const findClassroomsByName = (name) => async (dispatch) => {
    try {
      const res = await ClassroomDataService.findByName(name);
  
      dispatch({
        type: RETRIEVE_CLASSROOM_BY_FILTER,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const retrieveClassrooms = () => async (dispatch) => {
    try {
      const res = await ClassroomDataService.getAll();
      console.log(res.data);
  
      dispatch({
        type: RETRIEVE_ALL_CLASSROOMS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateClassroom = (id, data) => async (dispatch) => {
    try {
      const res = await ClassroomDataService.update(id, data);
  
      dispatch({
        type: UPDATE_CLASSROOM,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteClassroom = (id) => async (dispatch) => {
    try {
      await ClassroomDataService.delete(id);
  
      dispatch({
        type: DELETE_CLASSROOM,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };