import {useEffect, useState} from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
/*import '../App.css'*/
import AppService from '../services/AppService.js'
import ApiService from "../services/ApiService.js";
import TimerPage from "./TimerPage.jsx";

export const appService = new AppService();
export const apiService = new ApiService();
function App() {
    const [count, setCount] = useState("");
    const [gameState, setGameState] = useState({});
    
    useEffect(() => {
        (async () => {
            await getGameState();
        })();
    }, []);
    
    const getGameState = async () => {
        setGameState(await apiService.getGameState());
    }

    const startGame = async () => {
        await apiService.startGame();
    }

    const stopGame = async () => {
        await apiService.stopGame();
        await getGameState();
    }

    const continueGame = async () => {
        await apiService.continueGame();
        await getGameState();
    }

    const options = {
        method: 'POST',
        headers: appService.optionHeaders,
        body: JSON.stringify(
            {
                "vtdPages": [22027],
                "login": appService.login,
                "password": appService.password,
                "connectInfo": {
                    "address": appService.hostAddress,
                    "port": "4000",
                    "schema": "ekptd"
                }
            }
        )
    };

    async function initializeVtd() {
        console.log(await apiService.initializeVtd());
    }
    
    function initializeVtd2() {
        fetch(`${appService.hostName}${appService.apiDir}initialize-vtd`, options)
            .then(res => res.json())
            .then(console.log)
            .catch(err => {console.log(err)});
    }
    
    async function createGame() {
        let gameId = await apiService.createGame();
        console.log(`created gameId = ${gameId}`);
    }
/*    function startGame() {
        let gameId = '1';
        let gameMode = 'Championship';
        fetch(`${appService.hostName}${appService.apiDir}start-game?gameId=${gameId}&mode=${gameMode}`, {
            method: 'POST',
            headers: appService.optionHeaders,
            body: JSON.stringify({
                'updateTimerIsOn': true,
                'updateClientTime': 1,
                'updateServerTime': 1,
                'highlightTime': 4,
                'gameTime': 120,
                'videoTimeOut': 10,
                'countOfVideo': 1,
                'currentRound': 'First',
                'currentPhase': 'First',
                'paramStandardSetting':{
                    'loceCrewEfficiencyStandard': 78,
                    'downtimeStandard': 247,
                    'downtimeOfLocalTrainsStandard': 466,
                    'downtimeOfUsualTrainsStandard': 126,
                    'crewEfficiencyTPCStandard': 12,
                    'loadingStandard': 350,
                    'unloadingStandard': 350
                }
            })
        }).then(res => console.log(res.ok));
    }*/
    
    async function getCalculationResult() {
        await apiService.getCalculationResult();
    }

    async function getSummary(){
        console.log(await apiService.getSummary());
    }
    async function getAvailableGames() {
        await apiService.getCalculationResult();
    }

    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => initializeVtd()}>
                    Init Game
                </button>
                <button onClick={() => createGame()}>
                    Create Game
                </button>
                <button onClick={() => startGame()}>
                    Start Game
                </button>
                <button onClick={() => stopGame()}>
                    Stop Game
                </button>
                <button onClick={() => continueGame()}>
                    Continue Game
                </button>
                <button onClick={() => getCalculationResult()}>
                    Get Calculation Result
                </button>
                <button onClick={() => getAvailableGames()}>
                    Get Available Games
                </button>
                <button onClick={() => getGameState()}>
                    Get Game State
                </button>
                <button onClick={() => getSummary()}>
                    Get Summary Result
                </button>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>
            <p>
                {count}
            </p>
            <button onClick={() => getGameState()}>
                Game State
            </button>
            <h1>
                ZAZ
            </h1>
            <h1>{gameState.countdown}</h1>
            <h1>{gameState.duration}</h1>
            <h1>{gameState.state}</h1>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
            {
                gameState.state !== undefined &&
                <TimerPage />
            }
        </>
    )
}

export default App
