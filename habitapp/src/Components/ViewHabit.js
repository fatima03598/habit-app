import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Streak from "./Streak";

class ViewHabit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      habitData: [],
      displayHabit: "",
      submitHabit: "",
      complete: false,
    };
  }
  
  componentDidMount() {
    fetch(`/habitapi/${this.props.user}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ habitData: data });
      });
  }

  handleDelete(event, id) {
    const habitID = id;
    console.log(id)
    if (window.confirm("Are you sure you want to delete it forever") === true) {
      fetch("habitapi/deletehabit", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          habit_id: habitID,
        }),
      })
        .then((response) => {
          response.json();
        })
        .then(this.refreshPage());
    }
  }

  refreshPage = () => {
    window.location.reload(false);
  };

  render() {
    return (
      <div id="viewHabits">
        {this.state.habitData ? (
          this.state.habitData.map((object) => (
            <div key={object.habit_id} className="viewHabit">
         
               <article className="habitInfo">
                 <h3>{object.habitName}</h3>
                 <p>{object.frequency}</p>
                 <h6>{object.description}</h6>
               </article>
                <article className="habitStreak">
                <Streak
                        habit={object.habit_id}
                        date={this.props.date}
                        complete={object.complete}
                        current_streak={object.current_streak}
                        highest_streak={object.highest_streak}
                        frequency={object.frequency}
                      />

                </article>
                <article className='deleteHabit'>
                <button
                key={object.habit_id}
              onClick={(e) => this.handleDelete(e,object.habit_id)}
              className="btn btn-outline-danger button-style justify-items-start"
              type="button"
            >
              <img src="trash.png" alt="Avatar" className="deleteImage" />
            </button>

                </article>
                 
  
          
            </div>
          ))
        ) : (
          <h1>Data logged in </h1>
        )}
      </div>
    );
  }
}

export default ViewHabit;
