import React,{useState} from 'react'
import './signUpScreen.css'
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword  } from "firebase/auth";
import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login,register } from './features/counter/counterSlice';
import { SingleBed } from '@mui/icons-material';





const SignUpScreen = ({email, onChangeSignIn}) => {
    const [password, setPassword]=useState("")
    const dispatch=useDispatch()
    const navigate = useNavigate()

    console.log(email)
const signUp = (e) =>{
e.preventDefault();

createUserWithEmailAndPassword(auth,email,password)
.then((userCredential)=>{
    
    if(userCredential.user){
        dispatch(register({
            email:userCredential.user
        }))
      
    }
})
.catch((error)=>{console.log(error)})
}
const signIn = (e) =>{
    e.preventDefault();

    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
        if (userCredential.user){
            dispatch(login({
                email:userCredential.user
            }))
          
        }
    })
    }

  return (
    <div className='signUpScreen'>
        <form>
        <h1>Sign In</h1>
        <input type="email" placeholder='Email' value={email} onChange={onChangeSignIn}/>
        <input type="password" placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        <button onClick={signIn}>Sign In</button>
        <h4 > <span className='signUp__gray'>New to Netflix ? </span> <span onClick={signUp} className='signUp__link'>Sign Up Now</span></h4>
        </form>

        
    </div>
  )
}

export default SignUpScreen