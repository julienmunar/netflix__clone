import React from 'react'
import './profilescreen.css'
import Nav from './Nav'
import { selectUser } from './features/counter/counterSlice'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from './features/counter/counterSlice'
import PlanScreen from './PlanScreen'
import { auth } from './firebase'
import { getAuth, signOut } from "firebase/auth";
const ProfileScreen = () => {

    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const navigate = useNavigate()
    const setSignOut = () => {
        signOut(auth)
        dispatch(logout())
        navigate("/")
    }

    return (
        <div className='profileScreen'>
            <Nav />
            <div className='profileScreen__body'>
                <h1>Edit Profile</h1>
                <div className='profileScreen__info'>
                    <img className='' src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' alt='' />
                    <div className='profileScreen__details'>
                    <h2>{user?.email}</h2>
                    <div className='profileScreen__plans'>
                        <h3>Plans (Current Plan and Premium) </h3>
                   
                        <PlanScreen title="Netflix Standard" resolution="1080p" subscribed={false}/>
                        <button onClick={setSignOut} className='profileScreen__signOut'>Sign Out</button>
                      

                    </div>
                </div>
                </div>
              
            </div>

        </div>
    )
}

export default ProfileScreen