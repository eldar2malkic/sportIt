import React, { useState } from "react";
import {Link, navigate} from "@reach/router";
import axios from "axios";

const New = () => {

    const [errors, setErrors] = useState("");

    const [eventName, setEventName] = useState("");
    const [locationName, setLocationName] = useState("");
    const [maxAttendees, setMaxAttendees] = useState("");
    const [date, setDate] = useState("");


    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/event', 
        {eventName, locationName, maxAttendees, date},{withCredentials: true}
        )
        .then(res => navigate("/home"))
        .catch(err => setErrors(err.response.data.errors));
    }

    return (
        <div className="container">
            <header>
                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    <Link to = {"/home"} >Home</Link> |
                    <Link to = {"/event/new"} >New</Link> |
                    <Link to = {"/search"} >Search</Link> |
                    <Link to = {"/users"} >Account</Link>
                </div>
                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    <h4>Do you have new game in mind ? </h4>
                </div>
            </header>
            <form style={{border: "2px solid black", padding:"20px", marginTop: "20px", backgroundColor: "whiteSmoke"}} className="form-group" onSubmit = {onSubmitHandler}>
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
                            <button style={{marginRight: "10px"}} className="btn btn-primary">Add Event</button>
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

export default New;