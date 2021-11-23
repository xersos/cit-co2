const db = require("../models");
const SensorValues = db.sensorValues;
const Sensor = db.sensor;

const getAllSensorValues = async (req, res) => {
  try {
      const sensorValues = await SensorValues.find().populate({path: 'sensor', model: Sensor});
      res.status(200).json(sensorValues);
  } catch(error) {
      res.status(404).json({message: error.message});
  }
}

const getOneSensorValue = async (req,res) => {
  const id = req.params.id;

  try {
      const sensorValue = await SensorValues.findById({_id: id}).populate({path: 'sensor', model: Sensor});

      res.status(200).json(sensorValue);
  } catch(error) {
      res.status(404).json({ message: error.message});
  }
}

const createSensorValue =  async (req, res) => {
  console.log(req.body);
  console.log(req.params);
  const sensor = req.body.sensor;
  const newSensorValue = new SensorValues({
      co2:  req.body.co2,
      nbrPeoples: req.body.nbrPeoples,
      sensor,
  })
  try {
      await newSensorValue.save();

      const sensorById = await Sensor.findById(sensor);

      sensorById.sensorValues.push(newSensorValue);
      await sensorById.save();

      res.status(201).json(newSensorValue);

  } catch(error) {
      res.status(400).json({ message : error.message});
  }
}

const updateSensorValue = async (req, res) => {
  const id = req.params.id;
  try{
      await SensorValues.findByIdAndUpdate({
        _id: id,
      },
      {   
          co2:req.body.co2,
          nbrPeoples:req.body.nbrPeoples,
      }
      )
      res.status(202).json({id: id});

  } catch (error) {
      res.status(401).json({message: error.message});
  }
  
}

const deleteSensorValue= async (req, res) => {
  const id= req.params.id;

  try {
      await SensorValues.findByIdAndRemove({_id: id});
      res.status(203).json({id:id});

  }catch(error) {
      res.status(402).json({message: error.message});
  }
}

const deleteSensorValues= async (req, res) => {
  const id= req.params.id;

  try {
      await SensorValues.deleteMany({});
      res.status(203).json({});

  }catch(error) {
      res.status(402).json({message: error.message});
  }
}

module.exports.getAllSensorValues = getAllSensorValues;
module.exports.getOneSensorValue = getOneSensorValue;
module.exports.createSensorValue = createSensorValue;
module.exports.updateSensorValue = updateSensorValue;
module.exports.deleteSensorValue = deleteSensorValue;
module.exports.deleteSensorValues = deleteSensorValues;