import React, { useEffect } from 'react';
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import './App.css';
import HomeScreen from './HomeScreen';
import Login from './Login';
import { login, selectUser } from './features/counter/counterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './firebase';
import ProfileScreen from './ProfileScreen';
import { logout } from './features/counter/counterSlice';

function App() {
  const user=useSelector(selectUser)


  const dispatch=useDispatch()
  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{

      if (user) {
        dispatch(login({
          email:user.email,
          uid:user.uid
        }))
      }
     else{
       dispatch(logout())
     }
    })

  },[dispatch])

  return (
    <div className="app">

      <Router>
      {!user ? (
<Login/>  

      ):(
        <Routes>
          <Route path="/" element={<HomeScreen/>}/>
          <Route path="/profile" element={<ProfileScreen/>}/>
 
        </Routes>
      )}
   

   
      
      </Router>


    </div>
  );
}

export default App;
