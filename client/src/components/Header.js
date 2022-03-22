import Navbar from './Navbar';
import '../App.css';
import React, {useEffect, useState } from 'react'
import axios from 'axios';
import { navigate } from '@reach/router';


const Header = () =>{
    
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
    }, [loggedUser._id])

    
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
        <div className="header">
            <Navbar />
            <div style={{display: "flex"}}>
                <h1 className='mainH1'>Sport It</h1>
            </div>
        </div>
    )
}
export default Header;