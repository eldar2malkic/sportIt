import './App.css';
import { Router } from '@reach/router';
import New from './components/New';
import DisplayAll from './components/DisplayAll';
import OneEvent from './components/OneEvent';
import Update from './components/Update';
// import { useState } from 'react';
import LogReg from './views/LogReg';
import Profile from './components/Profile';
import Header from './components/Header';




function App() {
  // const [updatedState, setUpdatedState] = useState(false);


  return (
    <div className="App">
      <Header />
      <Router>
        <LogReg path="/" />
        <DisplayAll path="/home" />
        <New path="/event/new" />
        <Update path="/event/:id/edit" />
        <OneEvent path="/event/:_id" />
        <Profile path="/profile/:_id"/>
      </Router>
    </div>
  );
}

export default App;
