import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../css/LandingPage.css"

const LandingPage = () => {
    let navigate = useNavigate()
  return (
      <div className='prueba'>
    <div className='botton-start' onClick={() => {navigate(`/pokegrid`);}}>
        <h1>Start</h1>
    </div>
      </div>
  )
}

export default LandingPage