import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Tooltip,
  Grid,
  Box,
  Typography,
  Container,
  Chip,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Select from "react-select";

const SubmitNewScore = () => {
  const navigate = useNavigate();

  const options = [
    { value: "chrisobrien", label: "Chris O'Brien" },
    { value: "joeoshea", label: "Joe O'Shea" },
  ];

  interface OptionType {
    value: string;
    label: string;
  }

  const [userName, setUserName] = useState<OptionType | null>(null);
  // this should be set by an admin in the future
  const [leagueStartDate, setLeagueStartDate] = useState<Date>(new Date(
    "2024-03-01"
  ));
  const [leagueEndDate, setLeagueEndDate] = useState<Date>(new Date(
    "2024-08-31"
  ));

  const [handicapIndex, setHandicapIndex] = useState<number>(0);
  const [courseHandicap, setCourseHandicap] = useState<number>(0);
  const [bestScores, setBestScores] = useState<number[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  //   const userName = useRef<HTMLInputElement>(null);
  const courseRef = useRef<HTMLInputElement>(null);
  const [starValue, setStarValue] = React.useState<number | null>(3);

  const [eaglesState, setEaglesState] = useState<number>(0);
  const [birdiesState, setBirdiesState] = useState<number>(0);
  const [parsState, setParsState] = useState<number>(0);
  const [bogeysState, setBogeysState] = useState<number>(0);
  const [doubleBogeysState, setDoubleBogeysState] = useState<number>(0);
  const [tripleBogeysState, setTripleBogeysState] = useState<number>(0);
  const [blobsState, setBlobsState] = useState<number>(0);

  const slopeRatingRef = useRef<Number>(0);
  const courseRatingRef = useRef<Number>(0);
  const parRef = useRef<Number>(72);

  const [slopeRatingState, setSlopeRatingState] = useState<number>(125);
  const [courseRatingState, setCourseRatingState] = useState<number>(70);
  const [parState, setParState] = useState<number>(72);

  const [holesPlayed, setHolesPlayed] = useState<number>(0);
  const [grossStablefordScore, setGrossStablefordScore] = useState<number>(0);
  const [eighteenHandicapStablefordScore, setEighteenHandicapStablefordScore] =
    useState<number>(0);
  const [
    thirtySixHandicapStablefordScore,
    setThirtySixHandicapStablefordScore,
  ] = useState<number>(0);
  const [slopeAdjustedStablefordScore, setSlopeAdjustedStablefordScore] =
    useState<number>(0);
  const [
    slopeAdjustedEighteenHandicapStablefordScore,
    setSlopeAdjustedEighteenHandicapStablefordScore,
  ] = useState<number>(0);
  const [
    slopeAdjustedThirtySixHandicapStablefordScore,
    setSlopeAdjustedThirtySixHandicapStablefordScore,
  ] = useState<number>(0);

  useEffect(() => {
    setHolesPlayed(
      eaglesState +
        birdiesState +
        parsState +
        bogeysState +
        doubleBogeysState +
        tripleBogeysState +
        blobsState
    );

    setEighteenHandicapStablefordScore(
      eaglesState * 5 +
        birdiesState * 4 +
        parsState * 3 +
        bogeysState * 2 +
        doubleBogeysState * 1
    );

    setThirtySixHandicapStablefordScore(
      eaglesState * 6 +
        birdiesState * 5 +
        parsState * 4 +
        bogeysState * 3 +
        doubleBogeysState * 2 +
        tripleBogeysState * 1
    );
  }, [
    eaglesState,
    birdiesState,
    parsState,
    bogeysState,
    doubleBogeysState,
    tripleBogeysState,
    blobsState,
  ]);

  useEffect(() => {
    setSlopeAdjustedEighteenHandicapStablefordScore(
      eighteenHandicapStablefordScore * (slopeRatingState / 120) -
        parState +
        courseRatingState
    );

    setSlopeAdjustedThirtySixHandicapStablefordScore(
      thirtySixHandicapStablefordScore * (slopeRatingState / 120) -
        parState +
        courseRatingState
    );
  }, [slopeRatingState, courseRatingState, eighteenHandicapStablefordScore, parState]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await Axios.post(`http://localhost:5000/api/players/submit-new-round`, {
        userName: userName,
        courseHandicap: 0,
        handicapIndex: handicapIndex,
        leagueStartDate: leagueStartDate,
        leagueEndDate: leagueEndDate,

        eagles: eaglesState,
        birdies: birdiesState,
        pars: parsState,
        bogeys: bogeysState,
        doubleBogeys: doubleBogeysState,
        tripleBogeys: tripleBogeysState,
        blobs: blobsState,

        slopeRating: slopeRatingState,
        courseRating: courseRatingState,
        par: parState,
        course: courseRef.current?.value,
        //   courseStarRating: starValue,
        datePlayed: Date.now(),

        grossStablefordScore: 0,
        eighteenHandicapStablefordScore: eighteenHandicapStablefordScore,
        thirtySixHandicapStablefordScore: thirtySixHandicapStablefordScore,
        slopeAdjustedStablefordScore: 0,
        slopeAdjustedEighteenHandicapStablefordScore:
          slopeAdjustedEighteenHandicapStablefordScore,
        slopeAdjustedThirtySixHandicapStablefordScore:
          slopeAdjustedThirtySixHandicapStablefordScore,
      }).then((response) => {
        navigate(`/leaderboard`);
      });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  //   useEffect(() => {
  //     const courseHandicap = Math.round(handicapIndex * (slopeRatingState / 113));
  //     setCourseHandicap(courseHandicap);
  //   }, [handicapIndex, slopeRatingState]);

  const handleChange = (
    selectedOption: { value: string; label: string } | null
  ) => {
    setUserName(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };

  return (
    <>
      <Container component="main" maxWidth="xs" max-height="100vh">
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            id="round-input-form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={20} sm={12}>
                <Select
                  onChange={handleChange}
                  options={options}
                  autoFocus={true}
                />
              </Grid>
              <Grid item xs={20} sm={12}>
                <TextField
                  required
                  fullWidth
                  label="Course Name"
                  inputRef={courseRef}
                  autoFocus
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Slope Rating"
                  name="slopeRating"
                  inputRef={slopeRatingRef}
                  onChange={(e) => setSlopeRatingState(Number(e.target.value))}
                  defaultValue="125"
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Course Rating"
                  inputRef={courseRatingRef}
                  onChange={(e) => setCourseRatingState(Number(e.target.value))}
                  defaultValue="70"
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Par"
                  inputRef={parRef}
                  onChange={(e) => setParState(Number(e.target.value))}
                  defaultValue="72"
                />
              </Grid>

              <Grid item xs={6} sm={6}>
                <TextField
                  type={"number"}
                  label="Eagles"
                  onChange={(e) => setEaglesState(Number(e.target.value))}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  type={"number"}
                  label="Birdies"
                  onChange={(e) => setBirdiesState(Number(e.target.value))}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  type={"number"}
                  label="Pars"
                  onChange={(e) => setParsState(Number(e.target.value))}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  type={"number"}
                  label="Bogeys"
                  onChange={(e) => setBogeysState(Number(e.target.value))}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  type={"number"}
                  label="Double Bogeys"
                  onChange={(e) => setDoubleBogeysState(Number(e.target.value))}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  type={"number"}
                  label="Triple Bogeys"
                  onChange={(e) => setTripleBogeysState(Number(e.target.value))}
                />
              </Grid>

              <Grid item xs={6} sm={6}>
                <TextField
                  type={"number"}
                  label="Blobs"
                  onChange={(e) => setBlobsState(Number(e.target.value))}
                />
              </Grid>

              <Grid item xs={6} sm={6}>
                {holesPlayed ? (
                  <>
                    <Chip
                      label={`Holes played: ${holesPlayed}`}
                      sx={{
                        backgroundColor:
                          holesPlayed === 18 ? "success.main" : "grey.500",
                        color: "white",
                      }}
                    />
                    {holesPlayed === 18 ? (
                      <CheckCircleRoundedIcon color="success" />
                    ) : null}
                  </>
                ) : null}
              </Grid>
            </Grid>

            <Grid
              item
              xs={10}
              sm={12}
              mt={1}
              mb={1}
              p={1}
              style={{
                borderRadius: "5px",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Typography variant="body2" color="text.secondary" align="center"
              >
                Points:
              </Typography>
              <Chip
                label={`${eighteenHandicapStablefordScore} pts`}
                sx={{
                  backgroundColor:
                    holesPlayed === 18 ? "success.main" : "grey.500",
                  color: "white",
                  ml: 1,
                }}
              />
              <Typography variant="body2" color="text.secondary" align="center" >
                Slope Adjusted points:
              </Typography>
              <Chip
                label={`${slopeAdjustedEighteenHandicapStablefordScore.toFixed(1)} pts`}
                sx={{
                  backgroundColor:
                    holesPlayed === 18 ? "success.main" : "grey.500",
                  color: "white",
                  ml: 1,
                }}
              />
            </Grid>

            <Tooltip title="Please make sure you played 18 holes">
              <span>
                <Button
                  disabled={holesPlayed !== 18}
                  className="w-100"
                  variant="contained"
                  type="submit"
                >
                  Submit
                </Button>
              </span>
            </Tooltip>
          </Box>
          <br></br>
        </Box>
      </Container>
    </>
  );
};

export default SubmitNewScore;
