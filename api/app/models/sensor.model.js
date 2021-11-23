module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: String,
        status: {
          type: String,
          enum : ['active','inactive'],
          default: 'inactive'
        },
        sensorValues : [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SensorValues"
          }
        ],
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Sensor = mongoose.model("sensor", schema);
    return Sensor;
  };