import React, { Component } from 'react'
import Dashboard from '../Containers/Dashboard'
import { Spinner } from 'reactstrap';

class LoadingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          date: "",
          dayWeek: "",
          weekday: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          data:'',
          dashboard:false
        };
      }


      componentDidMount() {
        const username = localStorage.getItem('username');
        const token = localStorage.getItem('token');
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let newdate = day + "-" + month + "-" + year;
        let dayWeek = this.state.weekday[date.getDay()];
        this.setState({
          date: newdate,
          dayWeek: dayWeek,
        });
        fetch(`api/getInfo/${username}/?token=${token}`)
        .then(response => response.json())
        .then(data => this.setState({
              data:data.userInfo,
              dashboard: true
        }))
       }


    render () {
     
    return (
        <div>
            { this.state.dashboard ? 
            <Dashboard dayWeek={this.state.dayWeek} date={this.state.date} data={this.state.data}/> 
            : <div><h1>Loading ...</h1> <Spinner color="info" style={{ width: '5rem', height: '5rem' }} /></div>
            }
        </div>
    )
}
}
export default LoadingPage