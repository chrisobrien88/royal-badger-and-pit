import Signup from "./Signup";
import { Container } from "react-bootstrap";
import { ThemeProvider } from "../contexts/ThemeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Leaderboard from "./Leaderboard";
import TopTrumpsIndex from "./topTrumps/TopTrumpsIndex";
import SubmitNewScore from "./SubmitNewScoreNoLogin";
import Navbar from "./Navbar";
import CreateProfile from "./CreateProfile";
import { useState, useEffect } from "react";
import Axios from "axios";

const windowHeight = window.innerHeight * 0.9;

function App() {

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
  }, []);

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
                <Route path="/signup" element={<Signup />} />
                <Route
                  path="/leaderboard"
                  element={
                    <Leaderboard
                      loading={leaderboardLoading}
                      players={players}
                    />
                  }
                />
                <Route path="/top-trumps" element={<TopTrumpsIndex />} />
                <Route path="/submit-new-score" element={<SubmitNewScore />} />
          
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
