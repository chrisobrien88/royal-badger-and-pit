import { createContext, useContext, useState } from "react";

export const UserContext = createContext<any>({
  playerRounds: [],
  setPlayerRounds: (playerRounds: any) => {},
  bestRoundsScores: [],
  setBestRoundsScores: (bestRoundsScores: any) => {},
  handicapIndex: 5,
  setHandicapIndex: (handicapIndex: number) => {},
  bestScores: [],
  setBestScores: (bestScores: any) => {},
  
});

export const useUserState = () => {
  return useContext(UserContext);
};

export const UserStateProvider = ({ children }: any) => {
  const [playerRounds, setPlayerRounds] = useState<any[]>([]);
  const [bestRoundsScores, setBestRoundsScores] = useState<number[]>([]);
  const [handicapIndex, setHandicapIndex] = useState<number>(0);
  const [bestScores, setBestScores] = useState<number[]>([]);


  return (
    <UserContext.Provider
      value={{
        playerRounds,
        setPlayerRounds,
        bestRoundsScores,
        setBestRoundsScores,
        handicapIndex,
        setHandicapIndex,
        bestScores,
        setBestScores,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
