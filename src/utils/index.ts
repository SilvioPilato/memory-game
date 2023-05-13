import { CARDS_PER_KIND, CARD_KINDS, SCORE_DOWN_MODIFIER, SCORE_UP_MODIFIER } from "../config";
import { Card } from "../store"
import { Leaderboard } from "../../types";
import { generateUsername } from "unique-username-generator";

export const getNewDeck = () : Card[] => {
    const couplesByKind = [
        ...CARD_KINDS,
        ...CARD_KINDS
    ];

    return couplesByKind.map((kind, index) => ({
        id: index,
        hidden: false,
        activeSide: "rear",
        kind,
        frontImage:  "https://i.imgur.com/8X9Q2a5.png",
        rearImage : "https://i.imgur.com/8X9Q2a5.png",
    }));
}

