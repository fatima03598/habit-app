import React, { Component } from "react";
import ViewHabit from "./ViewHabit";



class Streak extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStreak:0,
      highestStreak:0
    };
  }
 
  componentDidMount() {
  const date = this.props.date
  const lastDate = this.props.complete.length - 1
   if(this.props.complete.length > 1 && this.props.complete[lastDate] !== date) {
   this.sendStreak()
   }else {
    this.setState({
      currentStreak:this.props.current_streak,
      highestStreak:this.props.highest_streak
    })
  }
  }

  
  async sendStreak() {
    const currentHighestArray = await this.checkStreak(this.props.complete, parseInt(this.props.current_streak), parseInt(this.props.highest_streak));
    if(currentHighestArray[0] != this.props.current_streak || currentHighestArray[1] != this.props.highest_streak ) {
    
    const data = {
      current_streak: currentHighestArray[0],
      highest_streak: currentHighestArray[1],
    };

    fetch("/habitapi/addStrike/" + this.props.habit, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
    })
    .then(() => {
      this.setState({
        currentStreak:currentHighestArray[0],
        highestStreak:currentHighestArray[1]
      })
    })
    .catch((error) => {
      console.log("Error:", error);
    });
  }
  
    
  }

  isConsecutive = (arr, diff=0)=> {
    const array = arr.reverse()
    const latestDate = arr.reverse()[0]
    const previousDate = array[1]
    const lastDate = new Date(latestDate.split("-").reverse().join("/"));
    const now = new Date(previousDate.split("-").reverse().join("/"));
    console.log(lastDate, now)
    const one_day = 1000 * 60 * 60 * 24;
    const difference = Math.ceil((now.getTime() - lastDate.getTime()) / one_day);
    return  difference == diff ? true :  false 
  }

   checkStreak = (arr, current, highest) => {
     let diff;
    this.props.frequency === 'daily' ? diff=1 : this.props.frequency === 'weekly' ? diff=7 : diff=30
    if(this.isConsecutive(arr, diff)) {
     current +=1
     current > highest ? highest = current : console.log('not higher')
      return [current, highest]
    } else { 
      current = 0
       return [current, highest]
    } 
  }


  render() {
    return (
      <div className="Streak">
        {this.props.complete ? (
          <div>

            <p>Current streak: {this.state.currentStreak} <img className="fireStreak" src="/fire.png" alt="fireStreak"></img></p>
            <p>Highest streak: {this.state.highestStreak} <img className="fireStreak" src="/fire.png" alt="fireStreak"></img></p>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Streak;
