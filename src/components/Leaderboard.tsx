import React, { useState, useEffect } from 'react'
import { Card, Button} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import Axios from 'axios';

const Leaderboard = () => {
    const [error, setError] = React.useState<string>('')
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()
    const [players, setPlayers] = useState<any[]>([]);

    useEffect(() => {
        const getPlayers = async () => {
          try {
            Axios.get('http://localhost:5000/api/players').then((response) => {
            setPlayers(response.data)
            })
            
            console.log(players);
            
          }
          catch (err) {
            console.log(err);
          }
        }
        getPlayers();
      }, []);

   
  return (
    <>
        <Card>
            <Card.Body>
                user: {currentUser.displayName}
                <h2 className="text-center mb-4">Leaderboard</h2>
                {/* // create list\\\ */}
                <ul className='list'>
                    {players.map(player => 
                    <li
                        className='list-item card' 
                        key={player.id} > 
                        <strong>{player.firstName} {player.lastName} </strong>
                        <p>{player.roundsPlayed.length} rounds</p>
                    </li>)}
                </ul>
            </Card.Body>
        </Card>

    </>
  )
}

export default Leaderboard