import React, { useState, useEffect} from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Axios from 'axios';



const MyStats = () => {
    const { currentUser } = useAuth()
    const [playerRounds, setPlayerRounds] = useState<any[]>([]);
    const userName = currentUser.displayName

    

    useEffect(() => {
        const getplayerRounds = async () => {
          if(currentUser) {
            
          try {
            Axios.get(`http://localhost:5000/api/players/${userName}`).then((response) => {
            setPlayerRounds(response.data.roundsPlayed);
          });
          }
          catch (err) {
            console.log(err);
          }
        }
      }
      getplayerRounds();
      }, []);      
      if (!currentUser) {
        return <Navigate to="/login" />
    }

    

  return (
    <>
        <p>User: <strong>{currentUser.email}</strong></p>
        <Link to="/submit-new-score">Submit New Score</Link>
        <br></br>
        <Link to="/leaderboard">Leaderboard</Link>
        <p>Rounds</p>
        <ul className='list'>
            {playerRounds.map(playerRound =>
            <li
                className='list-item card'
                key={playerRound.id} >
                <strong>{playerRound.course} </strong> {playerRound.eighteenHandicapStablefordScore}
            </li>)}
        </ul>
    </>
  )
}

export default MyStats