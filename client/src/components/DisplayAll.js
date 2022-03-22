import React, {useState, useEffect} from 'react';
import {Link, navigate} from '@reach/router';
import axios from 'axios';
import "../App.css"

const DisplayAll = () => {

    const [eventsList, setEventsList] = useState([]);
    const [loggedUser, setLoggedUser] = useState({});


    useEffect (() => {
        axios.get("http://localhost:8000/api/event")
        .then((res) => {
            setEventsList(res.data);
            console.log(res.data);
        })
        .catch(err => console.log(err))
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
        <div className='container'>
            {/* <header>
                <div style={{margin: "10px, 0px", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    <Link to = {"/home"} >Home</Link> |
                    <Link to = {"/event/new"} >New</Link> |
                    <Link to = {"/search"} >Search</Link> |
                    <Link to = {`/profile/${loggedUser._id}`} >Account</Link>
                </div>
            </header> */}
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <h3 style={{display: "flex", }}>Welcome {loggedUser.firstName} {loggedUser.lastName}</h3>
                <button className='class="btn btn-secondary btn-lg"' onClick={logout}>Log Out</button>
            </div>
                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    <h4>These are events you might be interested in</h4>
                </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Event Name</th>
                        <th scope="col">Location Name</th>
                        <th scope="col">Attendees</th>
                        <th scope="col">Date</th>
                        <th scope="col">Created By</th>
                    </tr>
                </thead>
                <tbody>
                    {eventsList 
                    ? eventsList.map((event, index) => (
                            <tr key={event._id}>
                                <td><Link to = {`/event/${event._id}`} >{event.eventName}</Link></td>
                                <td>{event.locationName}</td>
                                <td>{event.maxAttendees}</td>
                                <td>{event.date}</td>
                                <td>
                                    <Link to={`/profile/${event.createdBy._id}`}>
                                    {event.createdBy.firstName} {event.createdBy.lastName}
                                    </Link>
                                </td>
                            </tr>
                        )
                    )
                    : null
                    }
                </tbody>
            </table>
        </div>
    )
}

export default DisplayAll;