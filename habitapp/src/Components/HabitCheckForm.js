import React, { Component } from "react";
import Habit from "./Habit";
let toComplete = [];
class HabitCheckForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      habits: [],
      completeArray: "",
      toComplete: [],
    };
  }
  componentDidMount() {
    fetch(`/habitapi/${this.props.user}`)
      .then((response) => response.json())
      .then((result) =>
        this.setState(
          {
            habits: result,
          },
          () => this.ToComplete()
        )
      );
    // this.ToComplete();
  }
  async ToComplete() {
    if (this.state.habits.length > 0) {
      await this.checkComplete();
      this.setState({
        toComplete: toComplete,
      });
    } 
  }
  checkComplete = () => {
    this.state.habits.map((object) => {
      const todaysDate = this.props.date;
      if (object.complete.length > 0) {
        const latestDate = object.complete[object.complete.length - 1];
        const lastDate = new Date(latestDate.split("-").reverse().join("/"));
        const now = new Date(todaysDate.split("-").reverse().join("/"));
        const one_day = 1000 * 60 * 60 * 24;
        const diff = Math.ceil((lastDate.getTime() - now.getTime()) / one_day);
        if (
          (object.frequency === "daily" &&
            object.complete[object.complete.length - 1] !== todaysDate) ||
          (object.frequency === "weekly" && diff > 7) ||
          (object.frequency === "monthly" && diff > 30)
        ) {
          return toComplete.push(object);
        } 
      } else if (object.complete.length === 0) {
        return toComplete.push(object);
      } 
    });
  };
  render() {
    return (
      <div className="checkHabit">
        <p>Today's Goal</p>
        {this.state.toComplete.length > 0 ? (
          this.state.toComplete.map((object) => (
            <Habit
            key={object.habit_id}
              date={this.props.date}
              id={object.habit_id}
              description={object.description}
              complete={object.complete}
              name={object.habitName}
              current_streak={object.current_streak}
              highest_streak={object.highest_streak}
              frequency={object.frequency}
              handleDelete={this.props.handleDelete}
            />
          ))
        ) : (
          <div className="noCheckHabit">
            {" "}
            <h1>Yuppy No habits to complete</h1>{" "}
          </div>
        )}
      </div>
    );
  }
}
export default HabitCheckForm;