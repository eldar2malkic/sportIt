import React, { useState, useEffect } from "react";
import {navigate} from "@reach/router";
import axios from "axios";

const Update = (props) => {
    const [errors, setErrors] = useState({});

    const [eventName, setEventName] = useState("");
    const [locationName, setLocationName] = useState("");
    const [maxAttendees, setMaxAttendees] = useState("");
    const [date, setDate] = useState("");
    const [createdBy, setCreatedBy] = useState({});
    const {id} = props;
    const [loggedUser, setLoggedUser] = useState({});

    useEffect (() => {
        axios.get(`http://localhost:8000/api/event/${id}`)
        .then((res) => {
            console.log(res.data);
            setEventName(res.data.eventName);
            setLocationName(res.data.locationName);
            setMaxAttendees(res.data.maxAttendees);
            setDate(res.data.date);
            setCreatedBy(res.data.createdBy);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        axios.get("http://localhost:8000/api/users/secure",
            {
                withCredentials: true
            }
        )
        .then((res) => {
            console.log(res.data);
            setLoggedUser(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    const onUpdateHandler = (e) => {
        if(loggedUser._id === createdBy._id){
            e.preventDefault();
            axios.put(`http://localhost:8000/api/event/${id}`, 
            {eventName, locationName, maxAttendees, date})
            .then((res) => {
                console.log(res.data);
                navigate("/home");
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors);
            })
        }
        else {
            navigate("/home");
        }
    }

    const logout = (e) => {
        axios.post("http://localhost:8000/api/users/logout", 
            {},
            {
                withCredentials: true,
            },
        )
        .then((res) => {
            console.log(res.data);
            navigate("/");
        })
        .catch((err) => {
            console.log(err)
        })
    }


    return (
        <div className="container">
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <h3 style={{display: "flex", }}>Welcome {loggedUser.firstName} {loggedUser.lastName}</h3>
                <button className='class="btn btn-secondary btn-lg"' onClick={logout}>Log Out</button>
            </div>
            {/* <header>
                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    <Link to = {"/home"} >Home</Link> |
                    <Link to = {"/event/new"} >New</Link> |
                    <Link to = {"/search"} >Search</Link> |
                    <Link to = {"/users"} >Account</Link>
                </div>
            </header> */}
            <div style={{marginTop: "20px", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <h4>Modify this game</h4>
            </div>
            <form style={{border: "2px solid black", padding:"20px", marginTop: "20px", backgroundColor: "whiteSmoke"}} className="form-group" onSubmit = {onUpdateHandler}>
                <div className="row">
                    <div className="col-md">
                        <div>
                            <label style={{marginRight: "10px"}}>Event Name:</label>
                            <input style={{border: "1px solid black"}} className="form-control" onChange={(e) => setEventName(e.target.value)}
                            type = "text"
                            value = {eventName} />
                            <br />
                            {errors.eventName ? <p style={{color: "red"}}>{errors.eventName.message}</p> : null}
                        </div>
                        <div>
                            <label style={{marginRight: "10px"}}>Location Name:</label>
                            <input style={{border: "1px solid black"}} className="form-control" onChange={(e) => setLocationName(e.target.value)}
                            type = "text"
                            value = {locationName} />
                            <br />
                            {errors.eventType ? <p style={{color: "red"}}>{errors.eventType.message}</p> : null}
                        </div>
                        <div>
                            <label style={{marginRight: "10px"}}>Max Attendees:</label>
                            <input style={{border: "1px solid black"}} className="form-control" onChange={(e) => setMaxAttendees(e.target.value)}
                            type = "text"
                            value = {maxAttendees} />
                            <br />
                            {errors.maxAttendees ? <p style={{color: "red"}}>{errors.maxAttendees.message}</p> : null}
                            <button style={{marginRight: "10px"}} className="btn btn-primary">Edit Game</button>
                        </div>
                    </div>
                    <div className="col-md">
                        <div>
                            <label style={{marginRight: "10px"}}>Event Date:</label>
                            <input style={{border: "1px solid black"}} className="form-control" onChange={(e) => setDate(e.target.value)}
                            type = "date"
                            value = {date} />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )

}

export default Update;