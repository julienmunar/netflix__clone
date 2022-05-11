import React, { useState } from 'react'
import './login.css'
import netflixLogo from './netflixlogo.png'
import LanguageIcon from '@mui/icons-material/Language';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SignUpScreen from './SignUpScreen';

const Login = () => {
    const [signIn, setSignIn] = useState(false)
    const [email,setEmail]=useState('')
    const onChangeSignIn=(e)=>{setEmail(e.target.value)}
 
    return (

        <div className='login'>
            <div className='login__header'>
                <img className='header_logo' src={netflixLogo} alt='' />
                <div className='header__rightButtons'>
                    <button className='buttonLanguage'> <LanguageIcon /> Français <ArrowDropDownIcon /> </button>
                    <button onClick={()=>{setSignIn(true)}} className='buttonLogin'>S'identifier</button>
                </div>
            </div>
            <div className='login__hero'>
                {signIn ? (<SignUpScreen email={email} onChangeSignIn={onChangeSignIn}/>) : (
                    <div className='hero__content'>
                        <h1 className='hero__title'>Films, séries TV et bien  <br /> plus en illimité.</h1>
                        <h2 className='hero__slogan'>Où que vous soyez. Annuler à tout moment.</h2>
                        <div className='hero__signup'>
                            <p className='signup__enroll'>Prêt à regarder Netflix ? Saisissez votre addresse e-mail pour vous abonner ou réactiver votre  <br /> abonnement</p>
                            <div className='signup__content'>
                                <input placeholder='Addresse e-mail' onChange={onChangeSignIn} type="email" value={email}/>
                                <button className='signup__getStarted' onClick={()=>{setSignIn(true)}}>Commencer</button>
                            </div>
                        </div>

                    </div>)
                }

                <div className='login__linearGradient' />

            </div>






        </div>
    )
}

export default Login