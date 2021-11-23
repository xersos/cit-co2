import {
    CREATE_CLASSROOM,
    RETRIEVE_ALL_CLASSROOMS,
    RETRIEVE_CLASSROOM_BY_FILTER,
    RETRIEVE_CLASSROOM,
    UPDATE_CLASSROOM,
    DELETE_CLASSROOM,
  } from "../actions/types";
  
  const initialState = [];
  
  function classroomReducer(classrooms = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_CLASSROOM:
        return [...classrooms, payload];
  
      case RETRIEVE_ALL_CLASSROOMS:
        return payload;
      
      case RETRIEVE_CLASSROOM_BY_FILTER:
        return payload;

      case RETRIEVE_CLASSROOM:
          return classrooms.filter(({ id }) => id !== payload.id);
  
      case UPDATE_CLASSROOM:
        return classrooms.map((classroom) => {
          if (classroom.id === payload.id) {
            return {
              ...classroom,
              ...payload,
            };
          } else {
            return classroom;
          }
        });
  
      case DELETE_CLASSROOM:
        return classrooms.filter(({ id }) => id !== payload.id);
  
      default:
        return classrooms;
    }
  };
  
  export default classroomReducer;