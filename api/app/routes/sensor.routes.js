module.exports = app => {
    const sensors = require("../controllers/sensor.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Sensor
    router.post("/", sensors.createSensor);
  
    // Retrieve all Sensors
    router.get("/", sensors.getAllSensors);
  
    // Retrieve a single Sensor with id
    router.get("/:id", sensors.getOneSensor);
  
    // Update a Sensor with id
    router.put("/:id", sensors.updateSensor);
  
    // Delete a Sensor with id
    router.delete("/:id", sensors.deleteSensor);
  
    app.use('/api/sensors', router);
  };