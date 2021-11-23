module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: String,
        volume: Number,
        status: {
          type: String,
          enum : ['active','inactive'],
          default: 'inactive'
        },
        sensor: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Sensor",
        },
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Classroom = mongoose.model("classroom", schema);
    return Classroom;
  };