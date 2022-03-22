import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { navigate, Link } from '@reach/router';
import "../App.css";

const Navbar = () =>{

    const [loggedUser, setLoggedUser] = useState({});


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
    }, [loggedUser])


    return(
        <div className='container'>
            <div style={{display: "flex", flexDirection: "column"}}>
                <div style={{ margin: "10px, 0px", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    <Link className='link' to = {"/home"} >Home</Link> |
                    <Link className='link' to = {"/event/new"} >New</Link> |
                    <Link className='link' to = {"/search"} >Search</Link> |
                    <Link className='link' to = {`/profile/${loggedUser._id}`} >Account</Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar;