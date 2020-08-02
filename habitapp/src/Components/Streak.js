import React, { Component } from "react";
import ViewHabit from "./ViewHabit";

class Streak extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStreak: 0,
      highestStreak: 0,
    };
  }
  componentDidMount() {
    this.setState(
      {
        currentStreak: parseInt(this.props.current_streak),
        highestStreak: parseInt(this.props.highest_streak),
      },
      () => this.sendStreak()
      // () => this.checkStreak()
    );
  }

  increment = () => {
    this.setState(
      {
        currentStreak: this.state.currentStreak + 1,
      },
      () => {
        if (this.state.currentStreak > this.props.highest_streak) {
          this.higher();
        }
      }
    );
  };

  higher = () => {
    this.setState({
      highestStreak: this.state.currentStreak,
    });
  };

  async sendStreak() {
    await this.checkStreak();
    this.submitStreak();
  }

  checkStreak = () => {
    if (this.props.complete.length > 0) {
      const latestDate = this.props.complete[this.props.complete.length - 1];
      const lastDate = new Date(latestDate.split("-").reverse().join("/"));
      const now = new Date(this.props.date.split("-").reverse().join("/"));
      const one_day = 1000 * 60 * 60 * 24;
      const diff = Math.ceil((now.getTime() - lastDate.getTime()) / one_day);
      console.log(diff);

      if (
        (this.props.frequency === "daily" && diff === 1) ||
        (this.props.frequency === "weekly" && diff === 7) ||
        (this.props.frequency === "monthly" && diff === 30)
      ) {
        this.increment();
      } else {
        this.setState(
          {
            currentStreak: 0,
          },
          // () => this.submitStreak()
        );
      }
    }
  };

  submitStreak = () => {
    const CurrentStreak = this.props.date + "-" + this.state.currentStreak;
    const HighestStreak = this.props.date + "-" + this.state.highestStreak;

    const data = {
      current_streak: CurrentStreak,
      highest_streak: HighestStreak,
    };

    fetch("/habitapi/addStrike/" + this.props.habit, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
    }).catch((error) => {
      console.log("Error:", error);
    });
  };

  render() {
    // this.sendStreak()
    return (
      <div className="Streak">
        {this.props.complete ? (
          <div>
            {/* <ViewHabit current={this.state.currentStreak}
              highest= {this.state.highestStreak} /> */}

            <h3>current streak: {this.state.currentStreak}</h3>
            <h3>highest streak: {this.state.highestStreak}</h3>
          </div>
        ) : (
          <div>
            <h1>None</h1>{" "}
          </div>
        )}
      </div>
    );
  }
}

export default Streak;
