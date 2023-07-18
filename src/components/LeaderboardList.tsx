import React from 'react'
import { List, ListSubheader } from "@mui/material";
import LeaderboardCard from "./LeaderboardCard";
import { Player } from "../types/types";

interface IopenState {
    [key: string]: boolean;
  }

interface Props {
    players: Player[];
    open: IopenState;
    handleClick: (id: any) => void;
    leagueName: string;
}


const LeaderboardList = ({players, open, handleClick, leagueName}: Props) => {
    return (
        <List
                sx={{ width: 1, maxWidth: 360, mt: 2 }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        {leagueName}
                    </ListSubheader>
                }
            >
                {players
                    .sort((a: any, b: any) => b.totalScore - a.totalScore)
                    .map((player: any, index: any) => (
                        <LeaderboardCard
                            player={player}
                            handleClick={handleClick}
                            open={open}
                            index={index}
                        />
                    ))}
            </List>
    )
}

export default LeaderboardList