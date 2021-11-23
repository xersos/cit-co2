import React, { Component } from "react";
import { connect } from "react-redux";
import { createSensor } from "../../actions/sensor";

class AddSensor extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.saveSensor = this.saveSensor.bind(this);
    this.newSensor = this.newSensor.bind(this);

    this.state = {
      id: null,
      name: "",

      submitted: false,
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  saveSensor() {
    const { name } = this.state;

    this.props
      .createSensor(name)
      .then((data) => {
        this.setState({
          id: data.id,
          name: data.name,

          submitted: true,
        });
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newSensor() {
    this.setState({
      id: null,
      name: "",

      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newSensor}>
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

            <button onClick={this.saveSensor} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { createSensor })(AddSensor);