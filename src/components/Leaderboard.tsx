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
import LeaderboardList from "./LeaderboardList";
import { Player } from "../types/types";


interface IopenState {
  [key: string]: boolean;
}

const Leaderboard = ({ loading, players }: any) => {

  const [open, setOpen] = useState<IopenState>({});

  const handleClick = (id: any) => {
    setOpen((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  const badgerPlayers = players.filter(
    (player: Player) => player.leagueName === "badger"
  );

  const pitPlayers = players.filter(
    (player: Player) => player.leagueName === "pit"
  );

  return (
    <>
      {loading && (
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
      )}
      
      <LeaderboardList players={badgerPlayers} open={open} handleClick={handleClick} leagueName="Badger League"/>
      <LeaderboardList players={pitPlayers} open={open} handleClick={handleClick} leagueName="The Pit"/>
    </>
  );
};

export default Leaderboard;
