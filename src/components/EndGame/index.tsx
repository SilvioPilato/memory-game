import React, { useCallback, useEffect, useState } from 'react';
import { useAppStore } from '../../store';
import { Leaderboard } from '../../../types';
import { BACKEND_ADDRESS } from '../../config';

export const EndGame = () => {
    const [userName, setUserName] = useState('');
    const modalShown = useAppStore(state => state.modalShown);
    const cards =  useAppStore(state => state.cards);
    const showModal = useAppStore(state => state.showModal);
    const score = useAppStore(state => state.score);
    const leaderboard = useAppStore(state => state.leaderboard);
    const setLeaderboard = useAppStore(state => state.setLeaderboard);
    const startNewGame = useAppStore(state => state.startNewGame);
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
        let showClass = modalShown ? "flex" : "hidden";
        return `flex-col justify-center items-center ${showClass} z-1 absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50`;
    }, [modalShown])

    useEffect(() => {
        fetch(`${BACKEND_ADDRESS}/leaderboard`)
        .then(res => res.json()).then((data: Leaderboard) => {
            setLeaderboard(data);
        })
        .catch(err => console.log(err));
    },[setLeaderboard])


    useEffect(() => {
        if (cards.every(card => card.hidden)) {
            showModal()
        }
    }, [cards, showModal])

    return (
        <div className={getClasses()}>
            <div>
                <h1>{"Congratulation, you won!"}</h1>
                <form onSubmit={onSubmit}>
                    <input onChange={changeUsername} type="text" placeholder="Enter your name" value={userName}/>
                </form>
                {
                    leaderboard.map((entry, index) => {
                        return (
                            <div key={index}>
                                <span>{entry.username}</span>
                                <span>{entry.score}</span>
                            </div>
                        )
                    })
                }
                <button onClick={startNewGame}>Start new game</button>
            </div>
        </div>
    )
}