import { create } from 'zustand'

export type Card = {
    id: number,
    hidden: boolean,
    activeSide: "front" | "rear",
    kind: CardKind,
    frontImage: string,
    rearImage: string,
}
export type CardKind = "red" | "blue" | "green" | "yellow" | "black" | "white" | "purple" | "orange";
export type AppStore = {
    cards: Card[],
    cardShown: Card | null,
    shuffleCards: (times: number) => void,
    setCardShown: (card: Card | null) => void,
    setCardHidden: (card: Card) => void,
    flipCard: (card: Card) => void,
}

export const useAppStore = create<AppStore>((set) => ({
    cards: [
        {
            id: 1,
            hidden: false,
            activeSide: "rear",
            kind: "red",
            frontImage:  "https://i.imgur.com/8X9Q2a5.png",
            rearImage : "https://i.imgur.com/8X9Q2a5.png",
        },
        {
            id: 2,
            hidden: false,
            activeSide: "rear",
            kind: "blue",
            frontImage:  "https://i.imgur.com/8X9Q2a5.png",
            rearImage : "https://i.imgur.com/8X9Q2a5.png",
        },
        {
            id: 3,
            hidden: false,
            activeSide: "rear",
            kind: "green",
            frontImage:  "https://i.imgur.com/8X9Q2a5.png",
            rearImage : "https://i.imgur.com/8X9Q2a5.png",
        },
        {
            id: 4,
            hidden: false,
            activeSide: "rear",
            kind: "yellow",
            frontImage:  "https://i.imgur.com/8X9Q2a5.png", 
            rearImage : "https://i.imgur.com/8X9Q2a5.png",
        },
        {
            id: 5,
            hidden: false,
            activeSide: "rear",
            kind: "black",
            frontImage:  "https://i.imgur.com/8X9Q2a5.png",
            rearImage : "https://i.imgur.com/8X9Q2a5.png",
        },
        {
            id: 6,
            hidden: false,
            activeSide: "rear",
            kind: "white",
            frontImage:  "https://i.imgur.com/8X9Q2a5.png",
            rearImage : "https://i.imgur.com/8X9Q2a5.png",
        },
        {
            id: 7,
            hidden: false,
            activeSide: "rear",
            kind: "purple",
            frontImage:  "https://i.imgur.com/8X9Q2a5.png",
            rearImage : "https://i.imgur.com/8X9Q2a5.png",
        },
        {
            id: 8,
            hidden: false,
            activeSide: "rear",
            kind: "orange",
            frontImage:  "https://i.imgur.com/8X9Q2a5.png", 
            rearImage : "https://i.imgur.com/8X9Q2a5.png",
        },
        {
            id: 9,
            hidden: false,
            activeSide: "rear",
            kind: "red",
            frontImage:  "https://i.imgur.com/8X9Q2a5.png",
            rearImage : "https://i.imgur.com/8X9Q2a5.png",
        },
        {
            id: 10,
            hidden: false,
            activeSide: "rear",
            kind: "blue",
            frontImage:  "https://i.imgur.com/8X9Q2a5.png",
            rearImage : "https://i.imgur.com/8X9Q2a5.png",
        },
        {
            id: 11,
            hidden: false,
            activeSide: "rear",
            kind: "green",
            frontImage:  "https://i.imgur.com/8X9Q2a5.png",
            rearImage : "https://i.imgur.com/8X9Q2a5.png",
        },
        {
            id: 12,
            hidden: false,
            activeSide: "rear",
            kind: "yellow",
            frontImage:  "https://i.imgur.com/8X9Q2a5.png", 
            rearImage : "https://i.imgur.com/8X9Q2a5.png",
        },
        {
            id: 13,
            hidden: false,
            activeSide: "rear",
            kind: "black",
            frontImage:  "https://i.imgur.com/8X9Q2a5.png",
            rearImage : "https://i.imgur.com/8X9Q2a5.png",
        },
        {
            id: 14,
            hidden: false,
            activeSide: "rear",
            kind: "white",
            frontImage:  "https://i.imgur.com/8X9Q2a5.png",
            rearImage : "https://i.imgur.com/8X9Q2a5.png",
        },
        {
            id: 15,
            hidden: false,
            activeSide: "rear",
            kind: "purple",
            frontImage:  "https://i.imgur.com/8X9Q2a5.png",
            rearImage : "https://i.imgur.com/8X9Q2a5.png",
        },
        {
            id: 16,
            hidden: false,
            activeSide: "rear",
            kind: "orange",
            frontImage:  "https://i.imgur.com/8X9Q2a5.png", 
            rearImage : "https://i.imgur.com/8X9Q2a5.png",
        },  
    ],
    cardShown: null,
    setCardShown: (card: Card | null) => set({ cardShown: card }),
    setCardHidden: (card: Card) => set((state) => ({ cards: state.cards.map((c) => c.id === card.id ? { ...c, hidden: true } : c) })),
    shuffleCards: (times) => set((state) => ({ cards: shuffleDeck(state.cards, times) })),
    flipCard: (card) => set((state) => ({ cards: state.cards.map((c) => c.id === card.id ? { ...c, activeSide: c.activeSide === "front" ? "rear" : "front" } : c) })),
}))

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