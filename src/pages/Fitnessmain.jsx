import React, { useEffect, useRef, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import fit from '../Fitnessmain.module.css'
import { signOut } from 'firebase/auth'
import { auth } from "../firebase"


function Fitnessmain() {

  const navigate = useNavigate();

  const [exercises, setExercises] = useState([])
  const[inst, setInstr] = useState([[]])
  const secondCardRefs = useRef([]);

  const key = import.meta.env.VITE_REACT_APP_API_KEY;

  const [top, setTop] = useState('top: 0')

  const fetchData = async() => {
    try{
     const response = await fetch('https://exercisedb.p.rapidapi.com/exercises?limit=10&offset=0', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': key,
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
      }
     })
     const data = await response.json();
     setExercises(data)
     console.log(data)
     

    }
    catch(error){
      console.log(error)
    }    
  }

const NavigateWorkout = (index) => {
  if(secondCardRefs.current[index]) {
    secondCardRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'start'})
  }
};




  useEffect(() => {
    fetchData()
  },[]);

 
    const handleLougout = async () => {
      try{
        await signOut(auth);
        console.log("User logged out");
        navigate('/Login');
      }
      catch(error) {
        console.log("Logout error " +error.message)
      }
    };
  
  
  

  return (
    <>
      <div className={fit.page}>
        <div className={fit.bar}>
         <img className={fit.log} onClick={() => navigate("/")} src='Images/fitlogo.png' width={40} height={40} />
         <div className={fit.butt}>
        <h1>Welcome to PowerFit Gym!</h1>
        
         </div>
         <img className={fit.log} onClick={handleLougout} src='Images/logout.png' width={40} height={40} />
        </div>
        
        <div className={fit.banner}>
        </div>
        <h2 className={fit.select}>Select the workout ⬇️</h2>

      <div className={fit.cards}>
          {exercises.length>0? (
            exercises.map((item , index) => (
              <div onClick={() =>NavigateWorkout(index)}  key={index} className={fit.card}>
                <img  className={fit.images} src={item.gifUrl} alt='Excercise' />
                <p className={fit.name}>{item.name}</p>
              </div>
            ))
          ): (
            <p>Loading the data / failed to fetch</p>
          )}
      </div>
      <h2 className={fit.indetails}>In-Details of each workout!</h2>
    <div  className={fit.workouts}>
       {exercises.length>0? (
         exercises.map((items, index)=> (
          <div ref={(el) => (secondCardRefs.current[index] = el)} id='secondcard' key={index} className={fit.subcards}>
             <img className={fit.mainimages} src={items.gifUrl} alt='Exercises' />
        <div className={fit.workoutname}> 
          <h2><span className={fit.details}>Name:</span>  {items.name}</h2>
          <h2><span className={fit.details}>Target:</span> {items.target}</h2>
          <h2><span className={fit.details}>Equipment:</span>  {items.equipment}</h2>
        </div>
          
  <div className={fit.instructions}>
        <h3>Instructions:</h3>
  <ul>
    {items.instructions && items.instructions.length > 0 ? (
      items.instructions.map((instruction, idx) => (
        <li key={idx}>{instruction}</li>
      ))
    ) : (
      <li>No instructions available</li>
    )}
  </ul>
        </div>
        
          </div>
          
         ))
       ): (
        <p>Loading...</p>
       )}
    </div>


    </div>
 
    </>
  )
}

export default Fitnessmain