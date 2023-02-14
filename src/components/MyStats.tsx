import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Axios from "axios";
import { List, ListItem, Grid, Typography, Container } from "@mui/material";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import { Oval } from "react-loader-spinner";

// const list = new MDCList(document.querySelector('.mdc-list'));

interface openState {
  [key: string]: boolean;
}

const MyStats = () => {
  const { currentUser } = useAuth();
  const [playerRounds, setPlayerRounds] = useState<any[]>([]);
  const [bestRoundsScores, setBestRoundsScores] = useState<number[]>([]);
  const userName = currentUser.displayName;
  const [open, setOpen] = useState<openState>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [handicapIndex, setHandicapIndex] = useState<number>(0);
  const [bestScores, setBestScores] = useState<number[]>([]);

  const handleClick = (id: any) => {
    setOpen((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  useEffect(() => {
    setLoading(true);
    const getplayerRounds = async () => {
      if (currentUser) {
        try {
          Axios.get(
            `https://cerise-iguana-kit.cyclic.app/api/players/${userName}`
          ).then((response) => {
            setPlayerRounds(response.data.roundsPlayed);
            setBestRoundsScores(
              response.data.bestRounds.map(
                (round: any) =>
                  round.slopeAdjustedEighteenHandicapStablefordScore
              )
            );
          });
          Axios.get(
            `https://cerise-iguana-kit.cyclic.app/api/players/${userName}/best-rounds`
          ).then((response) => {
            setHandicapIndex(response.data.handicapIndex);
            setBestScores(response.data.scoresArr);
            setLoading(false);
          });
        } catch (err) {
          console.log(err);
        }
      }
    };
    getplayerRounds();
  }, []);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Container sx={{ mt: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              My Stats
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Handicap Index: {handicapIndex}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" gutterBottom>
              Rounds Played: <Chip label={playerRounds.length} sx={{ ml: 1 }} />
            </Typography>
            <Typography variant="body2" gutterBottom>
              Best Rounds:{" "}
              {bestRoundsScores.map((score, index) => (
                <Chip key={index} label={`${score} pts`} sx={{ ml: 1 }} />
              ))}
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <List
        sx={{ width: "100%", maxWidth: 360, mt: 2 }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Previous Rounds
          </ListSubheader>
        }
      >
        {loading ? (
          <Container sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
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
          </Container>
        ) : (
          playerRounds.map((playerRound) => (
            <Card
              key={playerRound.id}
              className="list-item card"
              sx={{ mt: 1 }}
            >
              <ListItem
                sx={{ mt: 1, flexDirection: "row" }}
                onClick={() => handleClick(playerRound.id)}
              >
                <ListItemText
                  secondary={playerRound.datePlayed.slice(0, 10)}
                  primary={playerRound.course}
                />
                <Chip
                  label={`${playerRound.eighteenHandicapStablefordScore} pts`}
                  sx={{
                    backgroundColor:
                      bestRoundsScores[2] &&
                      playerRound.slopeAdjustedEighteenHandicapStablefordScore >=
                        bestRoundsScores[2]
                        ? "success.main"
                        : "grey.500",
                    color: "white",
                    ml: 1,
                  }}
                />

                {open[playerRound.id] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>

              <Collapse in={open[playerRound.id]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    sx={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      mt: 1,
                      pl: 2,
                      backgroundColor: "grey.100",
                    }}
                  >
                    {playerRound.eagles ? (
                      <ListItemText
                        primary={playerRound.eagles}
                        secondary="eagles"
                      />
                    ) : null}
                    {playerRound.birdies ? (
                      <ListItemText
                        primary={playerRound.birdies}
                        secondary="birdies"
                      />
                    ) : null}
                    {playerRound.pars ? (
                      <ListItemText
                        primary={playerRound.pars}
                        secondary="pars"
                      />
                    ) : null}
                    {playerRound.bogeys ? (
                      <ListItemText
                        primary={playerRound.bogeys}
                        secondary="bogeys"
                      />
                    ) : null}
                    {playerRound.doubleBogeys ? (
                      <ListItemText
                        primary={playerRound.doubleBogeys}
                        secondary="double bogeys"
                      />
                    ) : null}
                    {playerRound.tripleBogeys ? (
                      <ListItemText
                        primary={playerRound.tripleBogeys}
                        secondary="triple bogeys"
                      />
                    ) : null}
                    {playerRound.blobs ? (
                      <ListItemText
                        primary={playerRound.blobs}
                        secondary="4+"
                      />
                    ) : null}
                  </ListItem>
                  <ListItem
                    sx={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      pl: 2,
                      backgroundColor: "grey.100",
                    }}
                  >
                    <ListItemText
                      primary={`${playerRound.slopeRating}`}
                      secondary={"slope rating"}
                    />
                    <ListItemText
                      primary={`${playerRound.courseRating}`}
                      secondary={"course rating"}
                    />
                  </ListItem>

                  <ListItem
                    sx={{
                      backgroundColor: "grey.100",
                    }}
                  >
                    <ListItemText secondary={`Slope adjusted score:`} />
                    <Chip
                      sx={{
                        backgroundColor: "grey.500",
                        color: "white",
                        mr: 9,
                      }}
                      label={`${playerRound.slopeAdjustedEighteenHandicapStablefordScore.toFixed(
                        2
                      )} pts`}
                    />
                  </ListItem>
                </List>
              </Collapse>
            </Card>
          ))
        )}
      </List>
    </>
  );
};

export default MyStats;
