import React, { Component } from "react";
import { connect } from "react-redux";
import { createClassroom } from "../../actions/classroom";

class AddClassroom extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeVolume = this.onChangeVolume.bind(this);
    this.onChangeSensor = this.onChangeSensor.bind(this);
    this.saveClassroom = this.saveClassroom.bind(this);
    this.newClassroom = this.newClassroom.bind(this);

    this.state = {
      id: null,
      name: "",
      volume: "",
      sensor: "",

      submitted: false,
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeVolume(e) {
    this.setState({
      volume: e.target.value,
    });
  }

  onChangeSensor(e) {
    this.setState({
      sensor: e.target.value,
    });
  }

  saveClassroom() {
    const { name, volume, sensor } = this.state;

    this.props
      .createClassroom(name, volume, sensor)
      .then((data) => {
        this.setState({
          id: data.id,
          name: data.name,
          volume: data.volume,
          sensor: data.sensor,

          submitted: true,
        });
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newClassroom() {
    this.setState({
      id: null,
      name: "",
      volume: "",
      sensor: "",

      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newClassroom}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="volume">Volume</label>
              <input
                type="text"
                className="form-control"
                id="volume"
                required
                value={this.state.volume}
                onChange={this.onChangeVolume}
                name="volume"
              />
            </div>

            <div className="form-group">
              <label htmlFor="sensor">SensorId</label>
              <input
                type="text"
                className="form-control"
                id="sensor"
                required
                value={this.state.sensor}
                onChange={this.onChangeSensor}
                name="sensor"
              />
            </div>

            <button onClick={this.saveClassroom} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { createClassroom })(AddClassroom);