module.exports = app => {
    const sensorValues = require("../controllers/sensor-values.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Sensor Value
    router.post("/", sensorValues.createSensorValue);
  
    // Retrieve all Sensor Values
    router.get("/", sensorValues.getAllSensorValues);
  
    // Retrieve a single Sensor Value with id
    router.get("/:id", sensorValues.getOneSensorValue);
  
    // Update a Sensor Value with id
    router.put("/:id", sensorValues.updateSensorValue);
  
    // Delete a Sensor Value with id
    router.delete("/:id", sensorValues.deleteSensorValue);

    router.delete("/", sensorValues.deleteSensorValues);
  
    app.use('/api/sensor-values', router);
  };