
export interface Round {
    id: number;
    handicapIndex: number;
    courseHandicap: number;
    eagles: number;
    birdies: number;
    pars: number;
    bogeys: number;
    doubleBogeys: number;
    tripleBogeys: number;
    blobs: number;
    slopeRating: number;
    courseRating: number;
    course: string;
    par: number;
    datePlayed: Date;
    grossStablefordScore: number;
    eighteenHandicapStablefordScore: number;
    thirtySixHandicapStablefordScore: number;
    slopeAdjustedStablefordScore: number;
    slopeAdjustedEighteenHandicapStablefordScore: number;
    slopeAdjustedThirtySixHandicapStablefordScore: number;
}

export interface Player {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    leagueName: string;
    roundsPlayed: Round[];
    handicapIndex: number;
    totalScore: number;
    bestRounds: Round[];
}
