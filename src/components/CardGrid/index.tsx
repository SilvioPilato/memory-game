import React, { useCallback, useState } from 'react';
import { Card, CardKind, useAppStore } from '../../store';
import { DEFAULT_SHOW_TIME_MS, SCORE_DOWN_MODIFIER, SCORE_UP_MODIFIER } from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBugs, faFishFins, faLocust, faSpider, faCat, faDog, faHorse, faShrimp, IconDefinition } from '@fortawesome/free-solid-svg-icons';


export const CardGrid = () => {
    const cards = useAppStore(state => state.cards);
    const flipCard = useAppStore(state => state.flipCard);
    const cardShown = useAppStore(state => state.cardShown);
    const setCardShown = useAppStore(state => state.setCardShown);
    const setCardHidden = useAppStore(state => state.setCardHidden);
    const updateScore = useAppStore(state => state.updateScore);

    const [isGridWaiting, setGridWaiting] = useState(false)
    const flipCardMemo = useCallback( (card: Card) => {
        return () =>  {
            // if card is already flipped, do nothing
            if (card.activeSide === 'front') return;
            if (isGridWaiting) return
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
            // flip them back over after a delay
            setGridWaiting(true);
            setCardShown(null);
            setTimeout(() => {
                flipCard(card);
                flipCard(cardShown);
                updateScore(SCORE_DOWN_MODIFIER)
                setGridWaiting(false);
            }, DEFAULT_SHOW_TIME_MS);
        }
    }, [cardShown, flipCard, isGridWaiting, setCardHidden, setCardShown, updateScore]);
    
    const getCardClasses = useCallback((card: Card) => {
        const baseClasses = 'aspect-square flex place-items-center rounded-md place-content-center cursor-pointer shadow-xl duration-1000'; 
        const activeSideClasses = card.activeSide === 'front' ? '[transform:rotateY(180deg)] ' : '';
        const hiddenClasses = card.hidden ? 'invisible' : 'visible'
        const color = mapColorsByKind[card.kind];
        return `${baseClasses} ${activeSideClasses} ${hiddenClasses} ${color}`;
    }, []);
    const getCardInnerClasses = useCallback((card: Card) => {
        const baseClasses = 'relative w-full h-full rounded-md [transform-style:preserve-3d] transition-all duration-1000';
        const activeSideClasses = card.activeSide === 'front' ? '[transform:rotateY(180deg)] ' : '';
        return `${baseClasses} ${activeSideClasses}`;
    }, []);
    const mapIconByKind: Record<CardKind, IconDefinition> = {
        red: faBugs,
        blue: faFishFins,
        green: faLocust,
        yellow: faDog,
        black: faSpider,
        pink: faShrimp,
        brown: faHorse,
        orange: faCat
    };
    const mapColorsByKind: Record<CardKind, string> = {
        red: 'text-red-500',
        blue: 'text-blue-500',
        green: 'text-green-500',
        yellow: 'text-yellow-600',
        black: 'text-black-500',
        pink: 'text-pink-500',
        brown: 'text-amber-900',
        orange: 'text-orange-500'
    }

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
                                    <div className={getCardInnerClasses(card)}>
                                        <div 
                                            style={{backfaceVisibility:"hidden"}} 
                                            id="card-front" 
                                            className='
                                                bg-slate-50 
                                                w-full 
                                                h-full 
                                                rounded-md 
                                                [transform:rotateY(180deg)] 
                                                absolute
                                                flex
                                                place-content-center 
                                                place-items-center
                                                '
                                            >
                                                <FontAwesomeIcon icon={mapIconByKind[card.kind]} size='5x'/>
                                        </div>
                                        <div 
                                            style={{backfaceVisibility:"hidden"}} 
                                            id="card-back" 
                                            className='card-back w-full h-full rounded-md absolute'>                                        
                                        </div>

                                    </div>

                            </div>
                        );
                    })
                }
            </div>
        </>
    );
};
