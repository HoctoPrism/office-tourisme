import React from 'react'
import Auth from "../auth/guard";
import Login from "../auth/login";

const RouteService = ({Component}) => {
    if (Auth.Guard()){
        return <Component />
    } else {
        return <Login />
    }
}

export default RouteService
