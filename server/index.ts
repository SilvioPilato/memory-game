import express from 'express';
import cors from 'cors'
import path from 'path';
import { Leaderboard } from '../types';
import { getRandomLeaderboard } from './utils';
const port = 8080;
const app = express();
const leaderboard: Leaderboard = getRandomLeaderboard();

app.use(express.json());
app.use(cors()) 
app.use('/', express.static(path.join(__dirname, '..', 'build')));
app.get('/', (_, res) => {
    res.sendFile(path.join('index.html'));
});
app.get('/leaderboard', (_, res) => {
    res.json(leaderboard.sort((a, b) => b.score - a.score));
});
app.put('/leaderboard', (req, res) => {
    const { username, score } = req.body;
    leaderboard.push({ username, score });
    res.json(leaderboard.sort((a, b) => b.score - a.score));
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});