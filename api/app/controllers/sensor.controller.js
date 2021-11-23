const db = require("../models");
const Sensor = db.sensor;
const SensorValues = db.sensorValues;

const getAllSensors = async (req, res) => {
  try {
      const sensors = await Sensor.find().populate({path: 'sensorValues', model: SensorValues});
      
      res.status(200).json(sensors);
  } catch(error) {
      res.status(404).json({message: error.message});
  }
}

const getOneSensor = async (req,res) => {
  const id = req.params.id;

  try {
      const sensor = await Sensor.findById({_id: id})
      .populate({path: 'sensorValues', model: SensorValues});

      res.status(200).json(sensor);
  } catch(error) {
      res.status(404).json({ message: error.message});
  }
}

const createSensor =  async (req, res) => {
  console.log(req.body);
  const newSensor = new Sensor({
      name:req.body.name,
      active:req.body.active ? req.body.active : false,
  })
  try {
      await newSensor.save();

      res.status(201).json(newSensor);

  } catch(error) {
      res.status(400).json({ message : error.message});
  }

}

const updateSensor = async (req, res) => {
  const id = req.params.id;
  try{
      await Sensor.findByIdAndUpdate({
        _id: id,
      },
      {   
        name:req.body.name,
        status:req.body.status ? req.body.status : 'inactive',
      }
      )
      res.status(202).json({id: id});

  } catch (error) {
      res.status(401).json({message: error.message});
  }
  
}

const deleteSensor= async (req, res) => {
  const id= req.params.id;

  try {
      await Sensor.findByIdAndRemove({_id: id});
      res.status(203).json({id:id});

  }catch(error) {
      res.status(402).json({message: error.message});
  }
}

module.exports.getAllSensors = getAllSensors;
module.exports.getOneSensor = getOneSensor;
module.exports.createSensor = createSensor;
module.exports.updateSensor = updateSensor;
module.exports.deleteSensor = deleteSensor;