import {
  Card,
  ListItem,
  ListItemText,
  Chip,
  Collapse,
  List,
  ListSubheader,
  Button,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Player } from "../types/types";

interface IopenState {
  [key: string]: boolean;
}

interface Props {
  player: Player;
  handleClick: (id: number) => void;
  open: IopenState;
  index: number;
}

const LeaderboardCard = ({ player, handleClick, open, index }: Props) => {
  return (
    <Card key={player.id} className="list-item card">
      <ListItem
        sx={{ mt: 1, flexDirection: "row" }}
        onClick={() => handleClick(player.id)}
      >
        <ListItemText primary={index + 1} />
        <ListItemText primary={player.firstName} secondary={player.lastName} />

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
              primary={`${player.roundsPlayed.length} ${
                player.roundsPlayed.length === 1 ? "round" : "rounds"
              }`}
              // secondary="rounds played"
            />
            {player.roundsPlayed[0] ? (
              <ListItemText
                primary={`${player.roundsPlayed[0].eighteenHandicapStablefordScore} pts`}
                secondary="last round"
              />
            ) : null}
          </ListItem>
          <ListSubheader component="div" id="nested-list-subheader">
            Handicap
          </ListSubheader>
          <ListItem sx={{ pl: 4 }}>
            <ListItemText primary={player.handicapIndex.toFixed(1)} />
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
                    secondary={`${player.bestRounds[0].datePlayed
                      .toString()
                      .slice(0, 10)} `}
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
                    secondary={`${player.bestRounds[1].datePlayed
                      .toString()
                      .slice(0, 10)} `}
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
                    secondary={`${player.bestRounds[2].datePlayed
                      .toString()
                      .slice(0, 10)} `}
                  />
                  <ListItemText
                    primary={`${player.bestRounds[2].course}`}
                    secondary={`${player.bestRounds[2].slopeRating} slope rating`}
                  />
                </>
              ) : null}
            </ListItem>
            <ListItem sx = {{ justifyContent: "center" }}>
              <Button variant="contained" onClick={() => console.log("helll")}>
                See More
              </Button>
            </ListItem>
          </List>
        </List>
      </Collapse>
    </Card>
  );
};

export default LeaderboardCard;
