import React, { useEffect, useState, useRef} from 'react'
import { useAuth } from '../contexts/AuthContext'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Button, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, Rating, Modal, Alert } from '@mui/material'

const SubmitNewScore = () => {
    const { currentUser } = useAuth()
    const userName = currentUser.displayName

    const navigate = useNavigate()

    const [handicapIndex, setHandicapIndex] = useState<number>(0)
    const [bestScores, setBestScores] = useState<number[]>([]);
  

    const courseRef = useRef<HTMLInputElement>(null);
    const [starValue, setStarValue] = React.useState<number | null>(2);

    const eaglesRef = useRef<Number>(0);
    const birdiesRef = useRef<Number>(0);
    const parsRef = useRef<Number>(0);
    const bogeysRef = useRef<Number>(0);
    const doubleBogeysRef = useRef<Number>(0);
    const tripleBogeysRef = useRef<Number>(0);
    const blobsRef = useRef<Number>(0);

    const [eaglesState, setEaglesState] = useState<number>(0);
    const [birdiesState, setBirdiesState] = useState<number>(0);
    const [parsState, setParsState] = useState<number>(0);
    const [bogeysState, setBogeysState] = useState<number>(0);
    const [doubleBogeysState, setDoubleBogeysState] = useState<number>(0);
    const [tripleBogeysState, setTripleBogeysState] = useState<number>(0);
    const [blobsState, setBlobsState] = useState<number>(0);

    const slopeRatingRef = useRef<Number>(0);
    const courseRatingRef = useRef<Number>(0);

    const [slopeRatingState, setSlopeRatingState] = useState<number>(125);
    const [courseRatingState, setCourseRatingState] = useState<number>(72);

    const [loading, setLoading] = useState<boolean>(false)
    const [incorrectHolesPlayed, setIncorrectHolesPlayed] = useState<boolean>(true)

    const [holesPlayed, setHolesPlayed] = useState<number>(0);
    const [grossStablefordScore, setGrossStablefordScore] = useState<number>(0);
    const [eighteenHandicapStablefordScore, setEighteenHandicapStablefordScore] = useState<number>(0);
    const [thirtySixHandicapStablefordScore, setThirtySixHandicapStablefordScore] = useState<number>(0);
    const [slopeAdjustedStablefordScore, setSlopeAdjustedStablefordScore] = useState<number>(0);
    const [slopeAdjustedEighteenHandicapStablefordScore, setSlopeAdjustedEighteenHandicapStablefordScore] = useState<number>(0);
    const [slopeAdjustedThirtySixHandicapStablefordScore, setSlopeAdjustedThirtySixHandicapStablefordScore] = useState<number>(0);

    useEffect (() => {
      if (holesPlayed === 18) {
        setIncorrectHolesPlayed(false)
      }
    }, [holesPlayed])

    useEffect(() => {
      
      setHolesPlayed(
        eaglesState +
        birdiesState +
        parsState +
        bogeysState +
        doubleBogeysState +
        tripleBogeysState +
        blobsState
      )

      setEighteenHandicapStablefordScore(
        eaglesState * 5 +
        birdiesState * 4 +
        parsState * 3 +
        bogeysState * 2 +
        doubleBogeysState * 1
      )

      setThirtySixHandicapStablefordScore(
        eaglesState * 6 +
        birdiesState * 5 +
        parsState * 4 +
        bogeysState * 3 +
        doubleBogeysState * 2 +
        tripleBogeysState * 1
      )

    }, [eaglesState, birdiesState, parsState, bogeysState, doubleBogeysState, tripleBogeysState, blobsState])

    useEffect (() => {
      setSlopeAdjustedEighteenHandicapStablefordScore(
        eighteenHandicapStablefordScore * (slopeRatingState / 125) - 72 + courseRatingState
      )

      setSlopeAdjustedThirtySixHandicapStablefordScore(
        thirtySixHandicapStablefordScore * (slopeRatingState / 125) - 72 + courseRatingState
      )

    }, [slopeRatingState, courseRatingState, eighteenHandicapStablefordScore])


      useEffect(() => {
        const getHandicapIndex = async () => {
          setLoading(true)
          try {
            Axios.get(`http://localhost:5000/api/players/${userName}/best-rounds`).then((response) => {
            setHandicapIndex(response.data.handicapIndex);
            setBestScores(response.data.scoresArr);
          });
          }
          catch (err) {
            console.log(err);
          }
        }
        getHandicapIndex();
        setLoading(false)
      }, []);

      const updateHandicap = (newScore: number) => {
        const bestScoresLength = bestScores.length;
        const worstScore = bestScores[bestScoresLength - 1];
        console.log(handicapIndex, 'original handicapIndex');
        
        if (newScore > worstScore && bestScoresLength > 1) {
          setBestScores(bestScores.slice(0, bestScoresLength - 1).concat(slopeAdjustedThirtySixHandicapStablefordScore));
          const totalBestScores = bestScores.reduce((a, b) => a + b, 0);
          const averageBestScores = totalBestScores / bestScoresLength;
          const newHandicapIndex = (averageBestScores - 72) * 0.88;
          setHandicapIndex(newHandicapIndex);
          console.log(newHandicapIndex, 'newHandicapIndex');
      }
        return        
      }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      
      e.preventDefault();
      setLoading(true)
      // console.log("submitting");
      // console.log(userName, 'userName');
      // console.log(bestScores, 'bestScores');
     
      
      
      
      try {
        await updateHandicap(slopeAdjustedThirtySixHandicapStablefordScore);
        await Axios.post(`http://localhost:5000/api/players/${userName}/submit-new-round`, {
          userName: userName,
          courseHandicap: 0,
          handicapIndex: handicapIndex,

          eagles: eaglesState,
          birdies: birdiesState,
          pars: parsState,
          bogeys: bogeysState,
          doubleBogeys: doubleBogeysState,
          tripleBogeys: tripleBogeysState,
          blobs: blobsState,

          slopeRating: slopeRatingState,
          courseRating: courseRatingState,
          course: courseRef.current?.value,
          courseStarRating: starValue,
          datePlayed: Date.now(),

          grossStablefordScore: 0,
          eighteenHandicapStablefordScore: eighteenHandicapStablefordScore,
          thirtySixHandicapStablefordScore: thirtySixHandicapStablefordScore,
          slopeAdjustedStablefordScore: 0,
          slopeAdjustedEighteenHandicapStablefordScore: slopeAdjustedEighteenHandicapStablefordScore,
          slopeAdjustedThirtySixHandicapStablefordScore: slopeAdjustedThirtySixHandicapStablefordScore,

        }).then((response) => {
          // console.log(response);
          // console.log(courseRef.current?.value, 'poop');
          navigate(`/my-stats`)
        });

        // await Axios.put(`http://localhost:5000/api/players/${userName}/update-handicap-index`, {
        //     userName: userName,
        //     handicapIndex: handicapIndex,
        // })
        
      }
      catch (err) {
        console.log(err);
      }
      setLoading(false)
    }

    // const [open, setOpen] = React.useState(false);

    // const handleOpen = (e: React.FormEvent<HTMLFormElement>) => {
    //   e.preventDefault();
    //   setOpen(true)
    // };

    // const handleClose = () => setOpen(false);
    // const style = {
    //   position: 'absolute' as 'absolute',
    //   top: '50%',
    //   left: '50%',
    //   transform: 'translate(-50%, -50%)',
    //   width: 400,
    //   bgcolor: 'background.paper',
    //   border: '2px solid #000',
    //   boxShadow: 24,
    //   p: 4,
    // };

  return (
    <>
    <Container component="main" maxWidth="xs" max-height="100vh">
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        >
        <Typography component="h1" variant="h5">
        Golfer: <strong>{userName}</strong>
        <div>Current Handicap Index: {handicapIndex}</div>
        </Typography>
       
        <Typography component="h1" variant="h5">
          Submit New Score
        </Typography>
        <Box component="form" id="round-input-form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={20} sm={12}>
              <TextField
                required
                fullWidth
                label="Course Name"
                inputRef = {courseRef}
                autoFocus/>
            </Grid>
            <Grid item xs={12} sm={6}>
              Star rating
              <Rating
                name="Out of 5 Stars"
                value={starValue}
                onChange={(event, newValue) => {
                  setStarValue(newValue);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Slope Rating"
                name='slopeRating'
                inputRef = {slopeRatingRef}
                onChange={e => setSlopeRatingState(Number(e.target.value))}
                defaultValue="125"/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Course Rating"
                inputRef = {courseRatingRef}
                onChange={e => setCourseRatingState(Number(e.target.value))}
                defaultValue="72"/>
            </Grid>
            
            <Grid item xs={5} sm={6}>
              <TextField
                type={"number"}
                label="Eagles"
                inputRef = {eaglesRef}
                onChange={e => setEaglesState(Number(e.target.value))}
                />
            </Grid>
            <Grid item xs={5} sm={6}>
              <TextField
                type={"number"}
                label="Birdies"
                inputRef = {birdiesRef}
                onChange={e => setBirdiesState(Number(e.target.value))}/>
            </Grid>
            <Grid item xs={5} sm={6}>
              <TextField
                type={"number"}
                label="Pars"
                inputRef = {parsRef}
                onChange={e => setParsState(Number(e.target.value))}/>
            </Grid>
            <Grid item xs={5} sm={6}>
              <TextField
                type={"number"}
                label="Bogeys"
                inputRef = {bogeysRef}
                onChange={e => setBogeysState(Number(e.target.value))}/>
            </Grid>
            <Grid item xs={5} sm={6}>
              <TextField
                type={"number"}
                label="Double Bogeys"
                inputRef = {doubleBogeysRef}
                onChange={e => setDoubleBogeysState(Number(e.target.value))}/>
            </Grid>
            <Grid item xs={5} sm={6}>
              <TextField
                type={"number"}
                label="Triple Bogeys"
                inputRef = {tripleBogeysRef}
                onChange={e => setTripleBogeysState(Number(e.target.value))}/>
            </Grid>
            <Grid item xs={5} sm={6}>
              <TextField
                type={"number"}
                label="Blobs"
                inputRef = {blobsRef}
                onChange={e => setBlobsState(Number(e.target.value))}/>
            </Grid>
            <Grid item xs={12} sm={12}>
            <Typography component="h5" variant="h5">
              Holes played: {holesPlayed}
            </Typography>
            <Typography component="h5" variant="h5">
              Stableford score (off 18): {eighteenHandicapStablefordScore}
            </Typography>
            <Typography component="h5" variant="h5">
              Slope Adjusted Score (off 18): {slopeAdjustedEighteenHandicapStablefordScore}
            </Typography>
            </Grid>

          </Grid>
        <Button disabled={incorrectHolesPlayed} className="w-100" type='submit'>Submit</Button>
        </Box>
      </Box>

      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>
          <h2 id="modal-modal-title">Modal title</h2>
          <p id="modal-modal-description">
            <h2>Course Name:</h2> {courseRef.current?.value}
          </p>
        <Button onClick={handleClose}>Edit</Button>
        <Button form="round-input-form" type="submit">Submit</Button>
        </Box>
      </Modal> */}

    </Container>
    </>
  )
}

export default SubmitNewScore