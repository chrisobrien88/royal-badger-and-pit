import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import { Container } from "react-bootstrap";
import Dashboard from "./Dashboard";
import Login from "./Login";
import { ThemeProvider } from "../contexts/ThemeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UpdateProfile from "./UpdateProfile";
import Leaderboard from "./Leaderboard";
import SubmitNewScore from "./SubmitNewScoreNoLogin";
import MyStats from "./MyStats";
import Navbar from "./Navbar";
import CreateProfile from "./CreateProfile";
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import Axios from "axios";
import { getPlayers } from "../utils/fetchingData";

interface openState {
  [key: string]: boolean;
}
const windowHeight = window.innerHeight * 0.9;

function App() {
  const { currentUser } = useAuth();

  const [playerRounds, setPlayerRounds] = useState<any[]>([]);
  const [name, setName] = useState<string>("");
  const [bestRoundsScores, setBestRoundsScores] = useState<number[]>([]);
  const [playerStatsloading, setPlayerStatsLoading] = useState<boolean>(false);
  const [handicapIndex, setHandicapIndex] = useState<number>(0);
  const [bestScores, setBestScores] = useState<number[]>([]);

  const [players, setPlayers] = useState<any[]>([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState<boolean>(false);
  useEffect(() => {
    setLeaderboardLoading(true);
    const getPlayers = async () => {
      try {
        await Axios.get(
          "https://cerise-iguana-kit.cyclic.app/api/players"
        ).then((response) => {
          setPlayers(response.data);
          setLeaderboardLoading(false);
        });
      } catch (err) {
        console.log(err);
      }
    };
    getPlayers();
  }, [playerRounds]);

  return (
    <>
      <Router>
        <ThemeProvider>
          <Container className="d-flex align-items-center justify-content-center">
            <div
              className="w-100"
              style={{
                width: 1,
                height: windowHeight,
                overflow: "scroll",
              }}
            >
              <Routes>
                {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                {/* <Route path="/update-profile" element={<UpdateProfile />} /> */}
                <Route path="/signup" element={<Signup />} />
                {/* <Route path="/" element={<Login />} /> */}
                {/* <Route path="/login" element={<Login />} /> */}
                {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
                <Route
                  path="/leaderboard"
                  element={
                    <Leaderboard
                      loading={leaderboardLoading}
                      players={players}
                    />
                  }
                />
                <Route path="/submit-new-score" element={<SubmitNewScore />} />
                {/* <Route
                  path="/my-stats"
                  element={
                    <MyStats
                      currentUser={currentUser}
                      name={name}
                      playerRounds={playerRounds}
                      handicapIndex={handicapIndex}
                      bestRoundsScores={bestRoundsScores}
                      loading={playerStatsloading}
                    />
                  }
                />
              */}
                <Route path="/create-profile" element={<CreateProfile />} /> 
                <Route path="*" element={<h1>404</h1>} />
              </Routes>
            </div>
            <Navbar />
          </Container>
        </ThemeProvider>
      </Router>
    </>
  );
}

export default App;
