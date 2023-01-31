import React from 'react'
import { useAuth } from '../contexts/AuthContext'


const SubmitNewScore = () => {
    const { currentUser } = useAuth()
    console.log(currentUser)
    
  return (
    <div>SubmitNewScore</div>
  )
}

export default SubmitNewScore