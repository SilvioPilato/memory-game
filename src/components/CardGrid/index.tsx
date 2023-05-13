import React, { useCallback } from 'react';
import { Card, useAppStore } from '../../store';
import { SCORE_DOWN_MODIFIER, SCORE_UP_MODIFIER } from '../../config';


export const CardGrid = () => {
    const cards = useAppStore(state => state.cards);
    const flipCard = useAppStore(state => state.flipCard);
    const cardShown = useAppStore(state => state.cardShown);
    const setCardShown = useAppStore(state => state.setCardShown);
    const setCardHidden = useAppStore(state => state.setCardHidden);
    const updateScore = useAppStore(state => state.updateScore);
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
                updateScore(SCORE_UP_MODIFIER);
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
            updateScore(SCORE_DOWN_MODIFIER)
        }
    }, [cardShown, flipCard, setCardHidden, setCardShown, updateScore]);
    
    const getCardClasses = useCallback((card: Card) => {
        const baseClasses = 'aspect-square flex place-items-center place-content-center border rounded-md cursor-pointer';
        const activeSideClasses = card.activeSide === 'front' ? 'bg-blue-500' : 'bg-red-500';
        const hiddenClasses = card.hidden ? 'invisible' : 'visible'
        return `${baseClasses} ${activeSideClasses} ${hiddenClasses}`;
    }, []);

    return (
        <>
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
