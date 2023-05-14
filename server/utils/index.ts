import { CARD_KINDS, SCORE_DOWN_MODIFIER, SCORE_UP_MODIFIER } from "../../src/config";
import { Leaderboard } from "../../types";
import { generateUsername } from "unique-username-generator";

export const getRandomLeaderboard = (users = 5, maxWrongMoves = 7): Leaderboard => {
    const leaderboard: Leaderboard = [];
    const maxScore = CARD_KINDS.length * SCORE_UP_MODIFIER;
    // Add a random score to each user
    for (let i = 0; i < users; i++) {
        let deductedPoints = Math.abs(Math.ceil(Math.random() * maxWrongMoves) * SCORE_DOWN_MODIFIER);
        leaderboard.push({
            username: generateUsername(),
            score: maxScore - deductedPoints,
        });
    }
    return leaderboard;
};