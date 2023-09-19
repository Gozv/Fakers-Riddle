import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"

function SendForm (props) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const abortControllerRef = useRef(null)

  useEffect(() => {
    const createUser = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(props),
            signal: abortControllerRef.current.signal
          })

          await response

        } catch (error) {
          setError([error.message, 'Please try again'])
        } finally {
          setIsLoading(false)
        }
    }
    abortControllerRef.current = new AbortController()
    createUser()
    return () => {
      abortControllerRef.current.abort()
    }
  })

  if(isLoading) {
    return(
      <main>
        <p> sending data ...</p>
      </main>
    )
  }

  if(error !== '') {
    return (
        <main>
            <p>{error}</p>
        </main>
    )
  }

  return(
    <main>
        <h2>welcome! you can play now</h2>
        <p> Please, go to <Link to={'/login'}>login </Link> to continue </p>
    </main>
  )
}

export default SendForm