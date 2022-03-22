import React, { useState } from 'react'
import axios from 'axios';
import { navigate } from '@reach/router';

const Register = (props) => {
    // const {updatedState, setUpdatedState} = props;

    const [user, setUser] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    })

    const [confirmReg, setConfirmReg] = useState("");
    const [errors, setErrors] = useState({});


    const handleChange = (e) => {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    };
    
    const onSubmitRegister = (e) => {
      e.preventDefault();

      axios.post('http://localhost:8000/api/users/register',
      user,
      {
        withCredentials: true
      })
      .then((res) => {
        console.log(res.data);
        setUser({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: ""
        });
        setConfirmReg("You have successfully registered. Please Log In now");
        setErrors({});
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data.errors);
      })
    }

    return (
        
    <div className="container">
      {
        confirmReg ?
        <h6 style= {{color: "green"}}> {confirmReg} </h6>
        : null
      }
      <form className="d-flex justify-content-evenly border border-secondary p-3" onSubmit={ onSubmitRegister }>
        <div className="col-6">
            <label className="form-label">First Name:</label>
            <div className="ptsb-3">
              {
                errors.firstName ?
                  <p className="text-danger" > {errors.firstName.message} </p>
                  : null
              }
              <input 
              className="form-control" 
              type="text"
              name="firstName"
              value={user.firstName} 
              onChange={(e) => handleChange(e)}/>
            </div>
            
            <label className="form-label">Last Name:</label>
            <div className="ptsb-3">
              {
                errors.lastName ?
                  <p className="text-danger" > {errors.lastName.message} </p>
                  : null
              }

              <input 
              className="form-control" 
              type="text"
              name='lastName'
              value={user.lastName}
              onChange={(e) => handleChange(e)}/>
            </div>

            <label className="form-label">Email:</label>
            <div className="ptsb-3">
              {
                errors.email ?
                  <p className="text-danger" > {errors.email.message} </p>
                  : null
              }
              <input 
              className="form-control" 
              type="text"
              name='email'
              value={user.email}
              onChange={(e) => handleChange(e)}/>
            </div>

            <label className="form-label">Password:</label>
            <div className="ptsb-3">
              {
                errors.password ?
                  <p className="text-danger" > {errors.password.message} </p>
                  : null
              }
              <input 
              className="form-control" 
              type="password"
              name='password'
              value={user.password} 
              onChange={(e) => handleChange(e)}/>
            </div>
            
            <label className="form-label">Confirm Password:</label>
            <div className="ptsb-3">
                {
                  errors.confirmPassword ?
                    <p className="text-danger" > {errors.confirmPassword.message} </p>
                      : null
                }
              <input 
              className="form-control" 
              type="password" 
              name='confirmPassword'
              value={user.confirmPassword}
              onChange={(e) => handleChange(e)}/>
            </div>
            <button type="submit" className="bi bi-upload mt-3" > Register</button>
        </div>
        </form>
    </div>
    )
}
export default Register;
