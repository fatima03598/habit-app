import React, { Component } from "react";


export class NewHabit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      habitName: "",
      habitDes: "food",
      frequency: "daily",
      complete: false,
    };
  }
  handleHabitname = (e) => {
    this.setState({ habitName: e.target.value });
  };
  handleHabitdes = (e) => {
    this.setState({ habitDes: e.target.value });
  };
  handleHabitfrequency = (e) => {
    this.setState({ frequency: e.target.value });
  };
  handleSubmit = (e) => {
    const data = {
      habitName: this.state.habitName,
      description: this.state.habitDes,
      frequency: this.state.frequency,
      userId: this.props.user,
      current_streak: `0`,
      highest_streak: `0`,
      complete: [],
    };
    fetch("/habitapi/newhabit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).catch((error) => {
      console.log("Error:", error);
    });

    e.preventDefault();
    // this.props.loadFunction(this.state);
  };
  refreshPage = () => {
    window.location.reload(false);
  };
  render() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary btn-lg btn-block"
          data-toggle="modal"
          data-target=".bd-example-modal-lg"
        >
          Add habit
        </button>
        <div
          className="modal fade bd-example-modal-lg"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myLargeModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Add Habit
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group row">
                    <label
                      htmlFor="habitName"
                      className="col-sm-2 col-form-label"
                    >
                      Habit Name
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        id="habitName"
                        value={this.state.habitName}
                        onChange={this.handleHabitname}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="habitDes"
                      className="col-sm-2 col-form-label"
                    >
                      Description
                    </label>
                    <div className="col-sm-10">
                      <select
                        className="form-control"
                        id="exampleFormControlSelect2"
                        value={this.state.habitDes}
                        onChange={this.handleHabitdes}
                      >
                        <option value="food">Food</option>
                        <option value="drinks">Drinks</option>
                        <option value="activities">Activities</option>
                        <option value="lifestyle">Lifestyle</option>
                        <option value="sports">Sports</option>
                        <option value="education">Education</option>
                        <option value="hygiene">Hygiene</option>
                        <option value="nature">Nature</option>
                        <option value="household">Household</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="goal" className="col-sm-2 col-form-label">
                      Goal
                    </label>
                    <div className="col-sm-10">
                      <select
                        className="form-control"
                        id="exampleFormControlSelect1"
                        value={this.state.frequency}
                        onChange={this.handleHabitfrequency}
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly - 30 days</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-sm-10">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={this.refreshPage}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewHabit;
