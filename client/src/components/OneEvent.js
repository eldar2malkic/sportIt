import { Link, navigate } from "@reach/router";
import axios from "axios";
import React, { useState, useEffect } from "react";

const OneEvent = (props) => {

    const [event, setEvent] = useState({});
    const [eventsList, setEventsList] = useState([]);
    const {_id} = props;
    const [loggedUser, setLoggedUser] = useState({});


    useEffect(() => {
        axios.get(`http://localhost:8000/api/event/${_id}`)
        .then((res) => {
            console.log(res.data);
            setEvent(res.data);
        })
        .catch(err => console.log(err))
    }, [_id]);

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

    const deleteHandler = (idFromBelow) => {
        if(event.createdBy._id == loggedUser._id){
            axios.delete(`http://localhost:8000/api/event/${idFromBelow}`)
            .then((res) => {
                const filteredEvents = eventsList.filter((event) => {
                    return event._id !== idFromBelow;
                })
                setEventsList(filteredEvents);
                navigate('/home');
            })
            .catch(err => console.log(err))
        }
        else {
            navigate("/home")
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
            {/* <header style={{display: "flex", flexDirection: "column"}}>
                <div style={{marginTop: "20px", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    <Link to = {"/home"} >Home</Link> |
                    <Link to = {"/event/new"} >New</Link> |
                    <Link to = {"/search"} >Search</Link> |
                    <Link to = {"/users"} >Account</Link>
                </div>
            </header> */}
                <div style={{marginTop: "20px",display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    <h4>Details about event {event.eventName} </h4>
                    {/* {event.createdBy._id == loggedUser._id
                    ? */}
                    <button className = "btn btn-danger" onClick={(e) => {deleteHandler(event._id)}}>Remove {event.eventName}</button>
                    {/* : null
                    } */}
                </div>
            <div style={{marginTop: "20px", border: "1px solid black", paddingTop: "20px"}} >
                <p className="row">
                    <span style={{fontWeight: "800"}} className="col-md" >Location Name:</span><br />
                    <span className="col-md">{event.locationName}</span>
                </p>
                <p className="row">
                    <span style={{fontWeight: "800"}} className="col-md">Attendees:</span><br />
                    <span className="col-md">{event.maxAttendees}</span>
                </p>
                <p className="row">
                    <span style={{fontWeight: "800"}} className="col-md">Date:</span><br />
                    <span className="col-md">{event.date}</span>
                </p>
            </div>
            <Link to = {`/event/${_id}/edit`} style={{margin: "10px"}} className="btn btn-primary">Edit this Event</Link>
        </div>
    )
}

export default OneEvent;
