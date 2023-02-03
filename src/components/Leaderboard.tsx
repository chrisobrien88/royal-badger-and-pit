import React, { useState, useEffect } from 'react'
import { Card, Button} from 'react-bootstrap'
import Axios from 'axios';
import { List, ListItem, TextField, Tooltip, Grid, Box, Typography, Container, ListSubheader, ListItemText, Chip} from '@mui/material'
import { styled } from '@mui/material/styles';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

interface openState {
  [key: string]: boolean;
}

const Leaderboard = () => {
    const [error, setError] = React.useState<string>('')
    const [players, setPlayers] = useState<any[]>([]);

    const [open, setOpen] = useState<openState>({ });

    const handleClick = (id: any) => {
      setOpen((prevState) => ({ ...prevState, [id]: !prevState[id] }));
    };

    useEffect(() => {
        const getPlayers = async () => {
          try {
            await Axios.get('https://cerise-iguana-kit.cyclic.app/api/players').then((response) => {
            const players = response.data.map(
              (player: any) => {
                if (player.roundsPlayed.length > 0) {
                  return player
                }
              }
            )
            setPlayers(players)
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
        <List
          sx={{ width: '100%', maxWidth: 360, mt: 2 }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
          <ListSubheader component="div" id="nested-list-subheader">
              Leaderboard
          </ListSubheader>}>

                    {players.sort((a: any, b: any) => b.totalScore - a.totalScore)
                    .map((player, index) => 
                  
                    <Card
                      key={player.id}
                      className='list-item card'>
                        <ListItem
                        sx = {{ mt: 1, flexDirection: 'row'}}
                        onClick={() => handleClick(player.id)}
                        >
                          <ListItemText primary={index + 1} />
                          <ListItemText primary={player.firstName} secondary={player.lastName} />
                          <ListItemText primary={player.handicapIndex} secondary='handicap' />
                
                          <Chip 
                            label={`${player.totalScore.toFixed(0)} pts`} 
                            sx = {{
                              bgcolor: index < 3 ? 'gold' : 'grey.500',

                            }
                              
                            } />

                          {open[player.id] ? <ExpandLess /> : <ExpandMore />}

                        </ListItem> 

                        <Collapse in={open[player.id]} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding 
                            style={
                              {backgroundColor: '#f5f5f5',
                            }
                            }>
                            <ListItem sx={{ pl: 4 }}>
                              <ListItemText primary={`${player.roundsPlayed.length}`} secondary="rounds played" />
                              <ListItemText primary={`${player.roundsPlayed[0].eighteenHandicapStablefordScore} pts`} secondary="last round" />

                            </ListItem>
                            <ListSubheader component="div" id="nested-list-subheader">
                                Top Scores 
                            </ListSubheader>
                            <List
                              sx = {{ flexDirection: 'row'}}
                              >
                              <ListItem sx={{ pl: 4,  }}>
                                {player.bestRounds[0]?
                                  <>
                                  <ListItemText primary={`${player.bestRounds[0].eighteenHandicapStablefordScore} pts`} secondary={`${player.bestRounds[0].datePlayed.slice(0,10)} `} />
                                  <ListItemText primary={`${player.bestRounds[0].course}`} secondary={`${player.bestRounds[0].slopeRating} slope rating`}/> 
                                  </> : null}
                              </ListItem>
                              <ListItem sx={{ pl: 4,  }}>
                                {player.bestRounds[1]?
                                  <>
                                  <ListItemText primary={`${player.bestRounds[1].eighteenHandicapStablefordScore} pts`} secondary={`${player.bestRounds[1].datePlayed.slice(0,10)} `} />
                                  <ListItemText primary={`${player.bestRounds[1].course}`} secondary={`${player.bestRounds[1].slopeRating} slope rating`}/> 
                                  </> : null}
                              </ListItem>
                              <ListItem sx={{ pl: 4,  }}>
                                {player.bestRounds[2]?
                                  <>
                                  <ListItemText primary={`${player.bestRounds[2].eighteenHandicapStablefordScore} pts`} secondary={`${player.bestRounds[2].datePlayed.slice(0,10)} `} />
                                  <ListItemText primary={`${player.bestRounds[2].course}`} secondary={`${player.bestRounds[2].slopeRating} slope rating`}/> 
                                  </> : null}
                              </ListItem>
                              
                            </List>
                          </List>
                        </Collapse>
                    </Card>
                    )}
                
            
        </List>

    </>
  )
}

export default Leaderboard