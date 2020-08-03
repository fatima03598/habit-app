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
    console.log('his increment ' + this.state.currentStreak)
    console.log('tthis increment' + this.state.highestStreak)
    const current = this.state.currentStreak
    this.setState(
      {
        currentStreak: current + 1,
      },
      () => {
        if (this.state.currentStreak > this.props.highest_streak) {
          console.log(' increment ' + this.state.currentStreak)
          console.log(' increment' + this.state.highestStreak)

          this.higher();
        }
      }
    );
  };

  higher = () => {
    console.log('current ' + this.state.currentStreak)
    const current = this.state.currentStreak
    this.setState({
      highestStreak: current,
    });
  };

  async sendStreak() {
    await this.checkStreak();
    console.log('before submit ' + this.state.currentStreak)
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
    const currentStreaks = this.props.date + "-" + this.state.currentStreak;
    const highestStreaks = this.props.date + "-" + this.state.highestStreak;
    console.log('on submit ' + this.state.currentStreak)
    console.log('on submit ' + currentStreaks)
    const data = {
      current_streak: currentStreaks,
      highest_streak: highestStreaks,
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
