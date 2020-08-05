import React, { Component } from "react";
import NewHabit from "../Components/NewHabit";
import ViewHabit from "../Components/ViewHabit";
import HabitCheckForm from "../Components/HabitCheckForm";
import Navigation from "../Components/Navigation";
import '../css/Dashboard.css'
class Dashboard extends Component {

  render() {
    
    const { user_id, userName, userSurname} = this.props.data
    const { dayWeek, date } = this.props;

    return (
      <div id="HomePage">
         <Navigation />
        
            <h1>{dayWeek}</h1>
            <h3>
              Welcome: {userName} {userSurname}
            </h3>
            <section className="habitsMain">
                <div className="habitCheck">
                  <HabitCheckForm user={user_id} date={date} />
                </div>
                <div className="viewHabits">
                  <ViewHabit user={user_id} date={date} />
                </div>
            </section>
            <section className="newHabit">
              <NewHabit user={user_id} date={date} />
            </section>        
                 
      </div>
               
          
    
    
    
    );
  }
}

export default Dashboard;