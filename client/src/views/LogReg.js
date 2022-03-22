// import React, {useState, useEffect} from 'react';
import React from 'react';
import Register from '../components/Register';
import Login from '../components/Login';

const LogReg = () => {
return(
    <div className="row">
        <div className="col-md">
            <Register />
        </div>
        <div className="col-md">
            <Login />
        </div>
        {/* <p>
            <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#Register" aria-expanded="true" aria-controls="multiCollapseExample1">Register</button>
            <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#Login" aria-expanded="false" aria-controls="multiCollapseExample2">Login</button>
        </p>
        <div className="row">
        <div className="col">
            <div className="collapse multi-collapse" id="Register">
            <div className="card card-body">
                <Register />
            </div>
            </div>
        </div>
        <div className="col">
            <div className="collapse multi-collapse" id="Login">
            <div className="card card-body">
                <Login />
            </div>
            </div>
        </div>
        </div> */}
    </div>
    )
}

export default LogReg;