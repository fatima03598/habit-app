import React from 'react'
import { Route, Redirect } from "react-router-dom";



export default function PrivateRoute({component: Component, authenticated, ...rest}) {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return (
        <Route
      {...rest}
      render={(props) => username && token
        ? <Component {...props} username={username} user_id='1' userName='FAtima' userSurname='abdul' />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    /> 
       
    )
}
