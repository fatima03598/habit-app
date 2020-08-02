import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import NewHabit from "../Components/NewHabit";
import ViewHabit from "../Components/ViewHabit";
import HabitCheckForm from "../Components/HabitCheckForm";
import Navigation from "../Components/Navigation";
class Dashboard extends Component {

  render() {
    
     const { user_id, userName, userSurname} = this.props.data
    const { dayWeek, date } = this.props;
    return (
      <div className="container-fluid" id="HomePage">
         <Navigation />
        <div className="row">
          <div className="col-lg-2" id="asideArea">
            <h1>{dayWeek}</h1>
            <h3>
              Welcome: {userName} {userSurname}
            </h3>
          </div>
          <div className="col-lg-7">
            <div className="App-body" id="habitCheckDiv">
              <HabitCheckForm user={user_id} date={date} />
            </div>
          </div>
          <div className="col-lg-3" id="asideArea">
            <div id="aside1">
              <NewHabit user={user_id} date={date} />
            </div>
            <div id="aside2">
              <button
                type="button"
                className="btn btn-primary btn-lg btn-block"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                View Completed Habits
              </button>

              <div
                className="modal fade"
                id="exampleModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content" id="viewHabit">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Completed Habit
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
                      {/* <ViewHabit user={user_id} date={date} /> */}
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;