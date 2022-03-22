import { Link, navigate } from "@reach/router";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Profile = (props) => {

    const [userEventList, setUserEventList] = useState([]);
    const [loggedUser, setLoggedUser] = useState({});
    const{_id} = props;

    useEffect(() =>{
        axios.get(`http://localhost:8000/api/eventsbyuser/${_id}`,
        {withCredentials: true}
        )
        .then((res) => {
            console.log(res.data);
            setUserEventList(res.data);
        })
        .catch((err) => {
            console.log(err)
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
            <div className="col-2">
                <table>
                    <tr>
                        <td>Name:</td>
                        <td>{loggedUser.firstName} {loggedUser.lastName}</td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>{loggedUser.email}</td>
                    </tr>
                </table>
            </div>
            <div className="col-2">
            <h5>Event History</h5>
            {
                userEventList.map((event, index) => (
                    <div key={index}>
                        <p>{event.eventName}</p>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default Profile;
