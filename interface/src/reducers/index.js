import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import classrooms from "./classrooms";
import sensorValues from "./sensor-values";

export default combineReducers({
  auth,
  message,
  classrooms,
  sensorValues
});