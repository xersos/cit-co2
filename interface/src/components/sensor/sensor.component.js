import React, { Component } from "react";
import { connect } from "react-redux";
import { updateSensor, deleteSensor } from "../../actions/sensor";
import SensorDataService from "../../services/sensor.service";
import Button from 'react-bootstrap/Button'

class Sensor extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.getSensor = this.getSensor.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeSensor = this.removeSensor.bind(this);

    this.state = {
      currentSensor: {
        id: null,
        name: "",
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getSensor(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function (prevState) {
      return {
        currentSensor: {
          ...prevState.currentSensor,
          name: name,
        },
      };
    });
  }

  getSensor(id) {
    SensorDataService.get(id)
      .then((response) => {
        this.setState({
          currentSensor: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateContent() {
    this.props
      .updateSensor(this.state.currentSensor.id, this.state.currentSensor)
      .then((reponse) => {
        console.log(reponse);
        
        this.setState({ message: "The sensor was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeSensor() {
    this.props
      .deleteSensor(this.state.currentSensor.id)
      .then(() => {
        this.props.history.push("/sensors");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentSensor } = this.state;

    return (
      <div>
        {currentSensor ? (
          <div className="edit-form">
            <h4>Sensor</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentSensor.name}
                  onChange={this.onChangeName}
                />
              </div>

            </form>

            <Button 
              type="submit"
              variant="danger" 
              onClick={this.removeSensor}
              >
                Delete
            </Button>

            <Button
              type="submit" 
              variant="info"
              onClick={this.updateContent}
              >
                Update
            </Button>

            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Sensor...</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updateSensor, deleteSensor })(Sensor);