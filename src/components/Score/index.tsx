import React from 'react';
import { useAppStore } from '../../store';
export const Score = () => {
    const score = useAppStore(state => state.score);

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='text-2xl font-bold'>Score</div>
            <div className='text-2xl font-bold'>{score}</div>
        </div>
    )
}