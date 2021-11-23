module.exports = app => {
    const classrooms = require("../controllers/classroom.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Classroom
    router.post("/", classrooms.createClassroom);
  
    // Retrieve all Classrooms
    router.get("/", classrooms.getAllClassrooms);

    // Retrieve all Classrooms by name
    router.get("/filter/", classrooms.getAllClassroomsByName);
  
    // Retrieve a single Classroom with id
    router.get("/:id", classrooms.getOneClassroom);
  
    // Update a Classroom with id
    router.put("/:id", classrooms.updateClassroom);
  
    // Delete a Classroom with id
    router.delete("/:id", classrooms.deleteClassroom);
  
    app.use('/api/classrooms', router);
  };