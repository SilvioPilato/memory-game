import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAppStore } from '../../store';
import { Leaderboard, LeaderboardEntry } from '../../../types';
import { BACKEND_ADDRESS, DEFAULT_MODAL_SHOW_TIME } from '../../config';
import { start } from 'repl';

export const EndGame = () => {
    const [userName, setUserName] = useState('');
    const modalShown = useAppStore(state => state.modalShown);
    const cards =  useAppStore(state => state.cards);
    const showModal = useAppStore(state => state.showModal);
    const score = useAppStore(state => state.score);
    const leaderboard = useAppStore(state => state.leaderboard);
    const setLeaderboard = useAppStore(state => state.setLeaderboard);
    const startNewGame = useAppStore(state => state.startNewGame);
    const resetDeckSides = useAppStore(state => state.resetDeckSides);
    const [userInLeaderboard, setUserInLeaderboard] = useState(-1);
    const [showLeaderboard, setShowLeaderboard] = useState<Leaderboard>([]);
    const changeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
    }
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetch(`${BACKEND_ADDRESS}/leaderboard`, {
            method: 'PUT',
            body: JSON.stringify({username: userName, score: score}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json()).then((data: Leaderboard) => {
            setLeaderboard(data);
            startNewGame();
        })
        .catch(err => console.log(err));
    }
    const getClasses = useCallback(() => {
        const showClass = modalShown ? "flex" : "hidden";
        return `flex-col justify-center items-center ${showClass} z-1 absolute top-0 left-0 w-full h-full bg-opacity-0`;
    }, [modalShown])
    const scrollToRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        fetch(`${BACKEND_ADDRESS}/leaderboard`)
        .then(res => res.json()).then((data: Leaderboard) => {
            setLeaderboard(data);
        })
        .catch(err => console.log(err));
    },[setLeaderboard])

    useEffect(() => {
        if (cards.every(card => card.hidden) && !modalShown) {
            const userEntry: LeaderboardEntry = {username: "", score: score};
            const newLeaderboard: Leaderboard = [...leaderboard, userEntry].sort((a, b) => b.score - a.score);
            const userIndex = newLeaderboard.findIndex(entry => entry === userEntry);
            setShowLeaderboard(newLeaderboard);
            setUserInLeaderboard(userIndex);
            setTimeout(() => {
                showModal();
                resetDeckSides();
            }, DEFAULT_MODAL_SHOW_TIME);
        }
    }, [cards, leaderboard, modalShown, resetDeckSides, score, showModal])

    useEffect(() => {  
        setTimeout(() => {
            scrollToRef.current?.scrollIntoView({behavior: 'smooth', block: 'center'})
            scrollToRef.current?.focus()
        },2000)
    }, [userInLeaderboard])

    return (
        <div className={getClasses()}>
            <div className='w-96 h-96 px-4 py-2 rounded-xl bg-zinc-50 flex flex-col justify-between'>
                <h1 className='font-bold text-lg'>{"Congratulation!"}</h1>
                <h2>{`You won with a score of ${score}`}</h2>
                <h3>{"Enter your name to save your score"}</h3>

                <div id="leaderboard-content" className='overflow-auto h-56 bg-violet-400 rounded-md'>
                    {
                        showLeaderboard.map((entry, index) => {
                            return (
                                <div className='h-8 mx-1 my-1 rounded-md bg-violet-500 text-slate-50 px-4 flex justify-between items-center' key={index}>
                                    <span>{index + 1}</span>
                                    {
                                        index === userInLeaderboard &&                 
                                        <form className='mx-auto font-bold' onSubmit={onSubmit}>
                                            <input
                                                autoComplete='off'
                                                ref={scrollToRef}   
                                                id='user-input'
                                                className='bg-transparent border-b-2 border-violet-300 outline-none text-center animate-pulse' 
                                                onChange={changeUsername} 
                                                type="text" 
                                                placeholder="" 
                                                value={userName}/>
                                        </form>
                                    }
                                    <span>{entry.username}</span>
                                    <span>{entry.score}</span>
                                </div>
                            )
                        })
                    }
                </div>
                <button onClick={startNewGame}>Start new game</button>
            </div>
        </div>
    )
}