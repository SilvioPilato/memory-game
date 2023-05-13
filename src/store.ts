import { create } from 'zustand'
import { CARD_KINDS } from './config';
import { getNewDeck } from './utils';
import {Leaderboard} from '../types';
import { createJSONStorage, persist } from 'zustand/middleware';
export type Card = {
    id: number,
    hidden: boolean,
    activeSide: "front" | "rear",
    kind: CardKind,
    frontImage: string,
    rearImage: string,
}
export type CardKind = typeof CARD_KINDS[number];
export type AppStore = {
    score: number,
    cards: Card[],
    cardShown: Card | null,
    modalShown: boolean,
    leaderboard: Leaderboard,
    setCardShown: (card: Card | null) => void,
    setCardHidden: (card: Card) => void,
    flipCard: (card: Card) => void,
    updateScore: (amount: number) => void,
    showModal: () => void,
    hideModal: () => void,
    startNewGame: () => void,
    setLeaderboard: (leaderboard: Leaderboard) => void,
}

export const useAppStore = create<AppStore>()(
    persist<AppStore>(
        (set, get) => {
            console.log(get());
            return {
                cards: getNewDeck(),
                score: 0,
                cardShown: null,
                modalShown:  false,
                leaderboard: [],
                setCardShown: (card: Card | null) => set({ cardShown: card }),
                setCardHidden: (card: Card) => set((state) => ({ cards: state.cards.map((c) => c.id === card.id ? { ...c, hidden: true } : c) })),
                updateScore: (amount: number) => set((state) => ({ score: state.score + amount })),
                flipCard: (card) => set((state) => ({ cards: state.cards.map((c) => c.id === card.id ? { ...c, activeSide: c.activeSide === "front" ? "rear" : "front" } : c) })),
                showModal: () => set({ modalShown: true }),
                hideModal: () => set({ modalShown: false }),
                startNewGame: () => set({ score: 0, cards: getNewDeck(), modalShown: false, cardShown: null }),
                setLeaderboard: (leaderboard) => set({ leaderboard }),
            }},  
        {
            name: 'memoryStorage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);