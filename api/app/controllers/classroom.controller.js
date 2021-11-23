const db = require("../models");
const Classroom = db.classrooms;
const Sensor = db.sensor;
const sensorValues = db.sensorValues;

const getAllClassrooms = async (req, res) => {
  try {
      const classroom = await Classroom.find()
          .populate({
              path: 'sensor',
              model: Sensor,
              populate: {
                  path: 'sensorValues',
                  model: sensorValues,
                  options: {limit: 50},
              },
          })
      
      res.status(200).json(classroom);
  } catch(error) {
      res.status(404).json({message: error.message});
  }
}

const getAllClassroomsByName = async (req, res) => {
  try {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name)} } : {};
    console.log(condition)

    const classroom = await Classroom.find(condition)
    .populate({path: 'sensor', model: Sensor, populate:{path: 'sensorValues', model: sensorValues}});

    res.status(200).json(classroom);
  } catch(error) {
    res.status(404).json({message: error.message});
  }
}

const getOneClassroom = async (req,res) => {
  const id = req.params.id;

  try {
      const classroom = await Classroom.findById({_id: id})
      .populate({path: 'sensor', model: Sensor, populate:{path: 'sensorValues', model: sensorValues}});

      res.status(200).json(classroom);
  } catch(error) {
      res.status(404).json({ message: error.message});
  }
}

const createClassroom =  async (req, res) => {
  console.log(req.body);
  const newclassroom = new Classroom({
      name:req.body.name,
      volume:req.body.volume,
      status:req.body.status ? req.body.status : 'inactive',
      sensor:req.body.sensor,
  })
  try {
      await newclassroom.save();

      res.status(201).json(newclassroom);

  } catch(error) {
      res.status(400).json({ message : error.message});
  }

}

const updateClassroom = async (req, res) => {
  const id = req.params.id;
  try{
      await Classroom.findByIdAndUpdate({
        _id: id,
      },
      {   
          name:req.body.name,
          volume:req.body.volume,
          occupied:req.body.occupied,
      }
      )
      res.status(202).json({id: id});

  } catch (error) {
      res.status(401).json({message: error.message});
  }
  
}

const deleteClassroom= async (req, res) => {
  const id= req.params.id;

  try {
      await Classroom.findByIdAndRemove({_id: id});
      res.status(203).json({id:id});

  }catch(error) {
      res.status(402).json({message: error.message});
  }
}

module.exports.getAllClassrooms = getAllClassrooms;
module.exports.getAllClassroomsByName = getAllClassroomsByName;
module.exports.createClassroom = createClassroom;
module.exports.getOneClassroom = getOneClassroom;
module.exports.updateClassroom = updateClassroom;
module.exports.deleteClassroom = deleteClassroom;