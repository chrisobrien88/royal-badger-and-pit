import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import {
  List,
  ListItem,
  ListSubheader,
  ListItemText,
  Chip,
} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Oval } from "react-loader-spinner";

interface openState {
  [key: string]: boolean;
}

const Leaderboard = ({loading, players }: any) => {
  const [error, setError] = React.useState<string>("");
  

  const [open, setOpen] = useState<openState>({});

  const handleClick = (id: any) => {
    setOpen((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };
  

  return (
    <>
      <List
        sx={{ width: 1, maxWidth: 360, mt: 2 }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Leaderboard
          </ListSubheader>
        }
      >
        {loading ? (
          <Oval
            height={180}
            width={180}
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={5}
            strokeWidthSecondary={5}
            
          />
        ) : (
          players
            .sort((a: any, b: any) => b.totalScore - a.totalScore)
            .map((player: any, index: any) => (
              <Card key={player.id} className="list-item card">
                <ListItem
                  sx={{ mt: 1, flexDirection: "row" }}
                  onClick={() => handleClick(player.id)}
                >
                  <ListItemText primary={index + 1} />
                  <ListItemText
                    primary={player.firstName}
                    secondary={player.lastName}
                  />
                  <ListItemText
                    primary={player.handicapIndex}
                    secondary="handicap"
                  />

                  <Chip
                    label={`${player.totalScore.toFixed(0)} pts`}
                    sx={{
                      bgcolor: index < 3 ? "gold" : "grey.500",
                    }}
                  />

                  {open[player.id] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={open[player.id]} timeout="auto" unmountOnExit>
                  <List
                    component="div"
                    disablePadding
                    style={{ backgroundColor: "#f5f5f5" }}
                  >
                    <ListItem sx={{ pl: 4 }}>
                      <ListItemText
                        primary={`${player.roundsPlayed.length}`}
                        secondary="rounds played"
                      />
                      {player.roundsPlayed[0] ? (
                        <ListItemText
                          primary={`${player.roundsPlayed[0].eighteenHandicapStablefordScore} pts`}
                          secondary="last round"
                        />
                      ) : null}
                    </ListItem>
                    <ListSubheader component="div" id="nested-list-subheader">
                      Top Scores
                    </ListSubheader>
                    <List sx={{ flexDirection: "row" }}>
                      <ListItem sx={{ pl: 4 }}>
                        {player.bestRounds[0] ? (
                          <>
                            <ListItemText
                              primary={`${player.bestRounds[0].eighteenHandicapStablefordScore} pts`}
                              secondary={`${player.bestRounds[0].datePlayed.slice(
                                0,
                                10
                              )} `}
                            />
                            <ListItemText
                              primary={`${player.bestRounds[0].course}`}
                              secondary={`${player.bestRounds[0].slopeRating} slope rating`}
                            />
                          </>
                        ) : null}
                      </ListItem>
                      <ListItem sx={{ pl: 4 }}>
                        {player.bestRounds[1] ? (
                          <>
                            <ListItemText
                              primary={`${player.bestRounds[1].eighteenHandicapStablefordScore} pts`}
                              secondary={`${player.bestRounds[1].datePlayed.slice(
                                0,
                                10
                              )} `}
                            />
                            <ListItemText
                              primary={`${player.bestRounds[1].course}`}
                              secondary={`${player.bestRounds[1].slopeRating} slope rating`}
                            />
                          </>
                        ) : null}
                      </ListItem>
                      <ListItem sx={{ pl: 4 }}>
                        {player.bestRounds[2] ? (
                          <>
                            <ListItemText
                              primary={`${player.bestRounds[2].eighteenHandicapStablefordScore} pts`}
                              secondary={`${player.bestRounds[2].datePlayed.slice(
                                0,
                                10
                              )} `}
                            />
                            <ListItemText
                              primary={`${player.bestRounds[2].course}`}
                              secondary={`${player.bestRounds[2].slopeRating} slope rating`}
                            />
                          </>
                        ) : null}
                      </ListItem>
                    </List>
                  </List>
                </Collapse>
              </Card>
            ))
        )}
      </List>
    </>
  );
};

export default Leaderboard;
