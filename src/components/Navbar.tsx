import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { useNavigate } from "react-router-dom";

import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function LabelBottomNavigation() {
  const { currentUser } = useAuth();

  const location = useLocation();

  const [value, setValue] = React.useState(location.pathname.replace(/\//, ""));
  const navigate = useNavigate();

  const handleClick = (route: string) => {
    // navigate to the route
    navigate(route);
  };
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const windowHeight = window.innerHeight*0.1;


  return (
    <BottomNavigation
      sx={{
        width: 1,
        height: windowHeight,
        position: "fixed",
        bottom: 0,
        zIndex: 10,
        backgroundColor: "#326d32",
        color: "white",
        boxShadow: "0 -1px 10px 0 #626262be",
      }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        onClick={() => handleClick("/my-stats")}
        label="My stats"
        value="my-stats"
        disabled={currentUser ? false : true}
        style={{ color: currentUser ? "white" : "grey" }}
        icon={<TimelineRoundedIcon />}
      />
      <BottomNavigationAction
        onClick={() => handleClick("/submit-new-score")}
        label="New Score"
        value="submit-new-score"
        disabled={currentUser ? false : true}
        style={{ color: currentUser ? "white" : "grey" }}
        icon={<AddBoxRoundedIcon />}
      />
      <BottomNavigationAction
        onClick={() => handleClick("/leaderboard")}
        label="Leaderboard"
        value="leaderboard"
        style={{ color: "white" }}
        icon={<LeaderboardIcon />}
      />
      <BottomNavigationAction
        onClick={() => {
          currentUser ? handleClick("/dashboard") : handleClick("/login");
        }}
        label="Dashboard"
        value="dashboard"
        style={{ color: "white" }}
        icon={<PersonRoundedIcon />}
      />
    </BottomNavigation>
  );
}
