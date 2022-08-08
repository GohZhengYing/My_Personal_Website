import React from 'react'
import './MainError.css'
import {useNavigate} from 'react-router-dom'

function MainError(){
    const navigateToHome = useNavigate()
    async function handleRedirect(){
        navigateToHome('/home')
    }
    return(
        <div className='MainError'>
            <h1>Oops!</h1>
            <h3>The page you were looking for doesn't exist</h3>
            <button onClick={handleRedirect}>Back to home page</button>
        </div>
    )
}

export default MainError