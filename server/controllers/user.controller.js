const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const register = (req, res) => {
    const user = new User(req.body);
    console.log(user); 
    user.save()
        .then((newUser)=>{
            console.log(newUser);
            console.log("success!");
            res.json({
                message: "Thank you for registering",
                user: newUser,
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        })
}

const login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((userRecord) => {
            if(userRecord === null){
                res.status(400).json({ message: "Invalid Login Attempt"});
            } else {
                bcrypt.compare(req.body.password, userRecord.password)
                    .then((isPasswordValid) => {
                        if(isPasswordValid=== true) {
                            console.log("password is valid");
                            res.cookie("usertoken", 
                                jwt.sign({
                                    id: userRecord._id,
                                    email: userRecord.email,
                                    // firstName: userRecord.firstName,
                                    // lastName: userRecord.lastName
                                },  
                                process.env.JWT_SECRET),
                                {
                                    httpOnly: true,
                                    expires: new Date(Date.now() + 1800000)
                                })
                                .json(
                                    {
                                    message: "Successfully logged in",
                                    userLoggedIn: {
                                        firstName: userRecord.firstName,
                                        userId: userRecord._id
                                    }
                                })
                        } else {
                            res.status(400).json({ message: "Invalid Login Attempt"})
                        }
                    })
                    .catch((err) => {
                    res.status(400).json({ message: "Invalid Login Attempt"})
                    })
            }
        })
        .catch((err) => {
            res.status(400).json({ message: "Invalid Login Attempt"})
        })
}

const logout = (req, res) => {
    console.log("logging out");
    res.clearCookie("usertoken");
    res.json({message: "you have successfully logged out of our system"});
}

const getLoggedInUser = (req, res) => {
    // const decodedJWT = jwt.decode(req.cookies.usertoken, {complete: true});
    User.findOne({_id: req.jwtpayload.id})
        .then(user => res.json(user))
        .catch(err =>res.json(err));
}

const getOneUser = (req, res) => {
    User.findOne({_id: req.params.id})
        .then((oneUser) => {
            console.log(oneUser);
            res.json(oneUser);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        })
}

const findAllUsers = (req, res) => {
    User.find()
    .then(allUsers => res.json(allUsers))
    .catch(err => res.status(400).json(err));
}

const deleteUser = (req, res) => {
    User.deleteOne({_id:req.params.id})
    .then(deleteConfirmation => res.json(deleteConfirmation))
    .catch( err => res.status(400).json(err));
}

module.exports = {
    register,
    login,
    logout,
    getLoggedInUser,
    findAllUsers,
    getOneUser,
    deleteUser
}