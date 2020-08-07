import React, { Component } from "react";

class Streak extends Component {
  
  render() {
    return (
      <div className="Streak">
        {this.props.complete ? (
          <div>

            <p>Current streak: {this.props.current_streak} <img className="fireStreak" src="/fire.png" alt="fireStreak"></img></p>
            <p>Highest streak: {this.props.highest_streak} <img className="fireStreak" src="/fire.png" alt="fireStreak"></img></p>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Streak;
