import { useEffect, useState } from 'react'

function Timer({ phase, initialTime, handlePhase }) {
 const [time, setTime ] = useState(initialTime)

 useEffect(() => {
  const interval = setInterval(() => {
    if(time > 0) {
        setTime((prevTime) => prevTime-1)
    } else {
        console.log('ir a la siguiente fase')
        handlePhase()
    }
  } , 1000)

  return () => clearInterval(interval)
 }, [time, handlePhase])

 useEffect(() => {
   setTime(() => initialTime)
 }, [initialTime])
    
  return (
    <div>
        <h2>{phase}</h2>
        <p>Tiempo restante : {time}</p>
    </div>

  )
}

export default Timer