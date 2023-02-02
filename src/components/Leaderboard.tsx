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
            await Axios.get('http://localhost:5000/api/players').then((response) => {
            setPlayers(response.data)
            }); 
          }
          catch (err) {
            console.log(err);
          }
        }
        getPlayers();
        // order Players by best score
        // players.sort((a: any, b: any) => b - a)

      }, []);
    
  return (
    <>
        <Card>
            <Card.Body>
                {currentUser && <p>user: {currentUser.displayName}</p>}
                <h2 className="text-center mb-4">Leaderboard</h2>
                {/* // create list\\\ */}
                <ul className='list'>
                    {players.sort((a: any, b: any) => b.totalScore - a.totalScore)
                    .map(player => 
                    
                    <li
                        className='list-item card' 
                        key={player.id} > 
                        
                        <strong>{player.firstName} {player.lastName}</strong>
                        {player.roundsPlayed.length > 0 ? 
                        <>
                        <p>{player.roundsPlayed.length} rounds</p>
                        <p>Handicap: {player.handicapIndex}</p>
                        <p>Total Score: {player.totalScore}</p>
                        {player.bestRounds[0]? <p>Best score: {player.bestRounds[0].eighteenHandicapStablefordScore}</p> : null}
                        </>
                        : <p>No rounds played</p>}
                    </li>)}
                </ul>
            </Card.Body>
        </Card>

    </>
  )
}

export default Leaderboard