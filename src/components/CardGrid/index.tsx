import React, { useCallback, useEffect, useMemo } from 'react';
import { Card, useAppStore } from '../../store';
import { DEFAULT_SHUFFLE_TIMES } from '../../config';


export const CardGrid = () => {
    const cards = useAppStore(state => state.cards);
    const shuffleCards = useAppStore(state => state.shuffleCards);
    const flipCard = useAppStore(state => state.flipCard);
    const cardShown = useAppStore(state => state.cardShown);
    const setCardShown = useAppStore(state => state.setCardShown);
    const setCardHidden = useAppStore(state => state.setCardHidden);
    useEffect(() => {
        shuffleCards(DEFAULT_SHUFFLE_TIMES);
    }, [shuffleCards]);
    const shuffleCardsMemo = useMemo(() => {
        return () => shuffleCards(DEFAULT_SHUFFLE_TIMES);
    }, [shuffleCards]);
    const flipCardMemo = useCallback( (card: Card) => {
        return () =>  {
            // if card is already flipped, do nothing
            if (card.activeSide === 'front') return;
            flipCard(card);
            // we have found a match 
            if (cardShown?.kind === card.kind && !cardShown?.hidden ) {
                setCardHidden(cardShown);
                setCardHidden(card);
                setCardShown(null);
                return;
            };
            // this is the first card we have flipped
            if (cardShown === null) {
                setCardShown(card);
                return;
            }
            // the player has flipped two cards that do not match
            setCardShown(null);
            flipCard(card);
            flipCard(cardShown);
        }
    }, [cardShown, flipCard, setCardHidden, setCardShown]);
    
    const getCardClasses = useCallback((card: Card) => {
        const baseClasses = 'aspect-square flex place-items-center place-content-center border rounded-md cursor-pointer';
        const activeSideClasses = card.activeSide === 'front' ? 'bg-blue-500' : 'bg-red-500';
        const hiddenClasses = card.hidden ? 'invisible' : 'visible'
        return `${baseClasses} ${activeSideClasses} ${hiddenClasses}`;
    }, []);

    return (
        <>
            <button onClick={shuffleCardsMemo}>Shuffle</button>
            <div className='grid grid-cols-4 w-2/5 gap-4'>
                {
                    cards.map((card) => {
                        return (
                            <div 
                                onClick={flipCardMemo(card)} 
                                className={getCardClasses(card)}
                                key={card.id}>
                                <p>{card.kind}</p>
                                <p>{card.id}</p>
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
};
