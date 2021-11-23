module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        co2: Number,
        nbrPeoples: Number,
        sensor: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Sensor"
        }
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const SensorValues = mongoose.model("sensorValues", schema);
    return SensorValues;
  };