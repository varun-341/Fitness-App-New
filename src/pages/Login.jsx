
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import sign from '../Signup.module.css'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

function Login(){

    const navigate = useNavigate()

    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')

    const onSignin =()=> {
        if(email.length < 16 || password.length <8 ) {
            alert('Please enter valid details')
        }
        else{
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) =>{
                navigate("/Fitnessmain")
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert('User not found')
                setEmail('')
                setPassword('')
            } );
        }
    }

    

    return(
        <>
    <div id={sign.logconatiner}>
        <div id={sign.login}>
         <form method='post'>
         <h1 id={sign.head}>Log In</h1>
         <div id={sign.input}>
         <label>Enter email:</label> <br/>

        <input 
        id={sign.inp} 
        type='email'
        value={email}
        onChange={(e) => {setEmail(e.target.value)}}
         placeholder ='Enter email' required
         /> <br/>


        <label>Enter password:</label> <br/>
        <input 
        id={sign.inp} 
        type='password' 
        value={password}
        onChange={(e) => {setPassword(e.target.value)}}
        placeholder='Enter password' required
        />
         </div>
         <br/>
         <button type='button' onClick={onSignin} id={sign.button}>Log In</button><br/><br/>
         <Link to={'/Signup'} id={sign.link} >Don't have an account?</Link>
         
         </form>
         </div>
         </div>
         
        </>
    )
}

export default Login