import React, { Component } from "react";

class Habit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitHabit: "",
      complete: false,
    };
  }
 
  refreshPage = () => {
    window.location.reload(false);
  };

  updateStreak = () => {
    console.log('lool')
     if(this.props.complete.length > 1 ) {
       console.log(this.props.complete)
     this.sendStreak()
     }
    }
  
    
    async sendStreak() {
      const currentHighestArray = await this.checkStreak(this.props.complete, parseInt(this.props.current_streak), parseInt(this.props.highest_streak));
      if(currentHighestArray[0] != this.props.current_streak || currentHighestArray[1] != this.props.highest_streak ) {
      
      const data = {
        current_streak: currentHighestArray[0],
        highest_streak: currentHighestArray[1],
      };
      console.log(currentHighestArray )
  
      fetch("/habitapi/addStrike/" + this.props.id, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(data),
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
      console.log(difference)
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
  
  

  handleSubmit = (e) => {
    this.updateStreak()
    const data = {
      complete: this.props.date,
    };
    let habit_id = this.props.id;
    fetch("/habitapi/addtime/" + habit_id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
    })
      .then((res) => this.setState({ submitHabit: "submitted" }))
      .catch((error) => {
        console.log("Error:", error);
      });
    window.location.reload(false);

    e.preventDefault();
  };

  render() {
    const logo = this.props.description;
    const logo1 = logo + ".png";
    return (
      <div className="todaysTask">
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id={logo}>
              <img src={logo1} alt="Avatar" className="habitimage" />
              <label htmlFor={this.props.name} className="habitLabel">
                {this.props.name}
              </label>
            </span>
          </div>
          <div className="input-group-append">
            <button
              className="btn btn-outline-success button-style"
              type="button"
              key={this.props.id}
              name={this.props.name}
              id={this.state.submitHabit}
              onClick={this.handleSubmit}
            >
              <img src="ok.png" alt="Avatar" className="habitimage1" />
            </button>
          
          </div>
        </div>
      </div>
    );
  }
}

export default Habit;
