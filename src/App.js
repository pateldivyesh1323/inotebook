import React,{useState} from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Login from './Components/Login'
import Signup from './Components/Signup'
import NoteState from './context/notes/noteState';
import Alert from './Components/Alert';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";

function App() {

  const [alert,setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500)
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <Routes>
            <Route path='/' element={<Login showAlert={showAlert}/>} />
            <Route path='/notes' element={<Home showAlert={showAlert}/>} />
            <Route path='/signup' element={<Signup showAlert={showAlert}/>} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;

