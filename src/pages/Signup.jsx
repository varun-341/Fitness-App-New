
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import sign from '../Signup.module.css'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'
function Sign(){

    const navigate = useNavigate()

    const[email, setEmail] = useState('')
    const[password , setPassword] = useState('')

    const onSignup =()=>{
       
        if(email.length < 16 || password.length<8){
            alert('Please Enter min Characters Email > 16 password > 8')
            setEmail('')
            setPassword('')
        }
        else{
            createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert("Account has been created")
                navigate("/Login")
            })
            .catch((error) => {
    
                alert('Invalid inputs or Account already exists')
              setEmail('')
              setPassword('')
            })
        }
    }

    return(
        <>
    <div id={sign.container}>
        <div id={sign.signup}>
     <form method='post'>
         <h1 id={sign.head}>Sign Up</h1>
         <div id={sign.input}>
         <label>Enter email:</label> <br/>
        <input 
         type='email' 
         value={email}
        onChange={(e) => {setEmail(e.target.value)}} 
        id={sign.inp} 
        placeholder ='Enter email' required
        /> <br/>


        <label>Enter password:</label> <br/>
        <input 
        type='password' 
        value={password}
        onChange={(e) => {setPassword(e.target.value)}} 
        id={sign.inp} 
        placeholder='Enter password' required
        />


         </div>
         <br/>
         <button type='button' onClick={onSignup} id={sign.button}>Sign Up</button><br/><br/>
         <NavLink to="/Login" id={sign.link} >Already have an account?</NavLink>
        
         </form>
         </div>
         </div>
       
        </>
    )
}

export default Sign