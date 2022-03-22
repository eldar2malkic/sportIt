import React, { useState } from 'react'
import axios from 'axios';
import { navigate, Link } from '@reach/router';


const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmitHandler = (e) => {
        e.preventDefault();
        
        const loggedInUser = {
            email,
            password
        }

        axios.post('http://localhost:8000/api/users/login', 
        loggedInUser, 
        { 
        withCredentials : true
        })
        .then((res) =>{
            console.log("successfully logged in");
            console.log(res.data)

            // localStorage.setItem("userId", res.data.user._id)
            // setUpdatedState(!updatedState)
            
            // const userId = localStorage.getItem("userId") || "not logged in"
            navigate('/home');  
        })
        .catch((err) => {
            console.log(err.response);
            setErrorMessage(err.response.data.message)
        })
    }

    return(

        <div className="container" >
            <form className="d-flex justify-content-evenly border p-3" onSubmit={ onSubmitHandler }>
                <div className="col-6">
                    <label className="form-label">Email:</label>
                    <div className="ptsb-3">
                    
                    <input 
                    className="form-control" 
                    type="text"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                
                
                    <label className="form-label">Password:</label>
                    <div className="ptsb-3">
                    
                    <input 
                    className="form-control" 
                    type="password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    {
                        errorMessage ?
                        <p className="text-danger" > {errorMessage} </p>
                        : null
                    }
                    <button type="submit" className="bi bi-upload mt-3" > Login </button>
                </div>
            </form>
        </div> 
    )
}

export default Login;