import { CARD_KINDS, DEFAULT_SHUFFLE_TIMES } from "../config";
import { Card } from "../store"

export const getDefaultDeck = () : Card[] => {
    const couplesByKind = [
        ...CARD_KINDS,
        ...CARD_KINDS
    ];

    return couplesByKind.map((kind, index) => ({
        id: index,
        hidden: false,
        activeSide: "rear",
        kind,
    }));
}

const shuffleDeck = (deck: Card[], times = 1) => {
    let shuffledDeck = [...deck];

    for (let t = 0; t < times; t++) {
        for (let i = 0; i < shuffleDeck.length; i++) {
            const j = Math.round(Math.random() * (deck.length - 1));
            const toSwap = shuffledDeck[j];
            shuffledDeck[j] = shuffledDeck[i];
            shuffledDeck[i] = toSwap;   
        }
    }

    return shuffledDeck;
}

export const getNewDeck = () => {
    const deck = getDefaultDeck();
    return shuffleDeck(deck, DEFAULT_SHUFFLE_TIMES);
}