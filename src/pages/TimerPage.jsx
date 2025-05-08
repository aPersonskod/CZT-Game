import { useState, useEffect, useRef } from 'react';
import '../Timer.css';
import ApiService from "../services/ApiService.js";
export const apiService = new ApiService();

const TestTimer = () => {
    const size = 200;
    const strokeWidth = 10;
    const [gameState, setGameState] = useState({
        state: 'Pause',
        countdown: '00:10:00',
        elapsed: '00:01:47',
        duration: '00:20:00',
        beginUtc: '2025-05-07T00:16:46.7404174Z'
    });
    const [isReset, setIsReset] = useState(false);

    useEffect(() => {
        (async () => {
            let gs = await apiService.getGameState();
            setGameState(gs);
            if(gs.state === 'Play'){
                await continueFetching();
            }
        })();
    }, [isReset]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isActive, setIsActive] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            /*            const response = await fetch(apiUrl);
            
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }*/

            const result = await apiService.getGameState();
            setGameState(result);
            setError(null);
        } catch (err) {
            setError(err.message);
            setGameState(null);
        } finally {
            setLoading(false);
        }
    };

    const startFetching = async () => {
        if (!isActive) {
            await apiService.startGame();
            // Initial fetch immediately
            fetchData();
            // Then set up interval
            intervalRef.current = setInterval(fetchData, 1000);
            setIsActive(true);
        }
    };
    const continueFetching = async () => {
        if (!isActive) {
            await apiService.continueGame();
            // Initial fetch immediately
            fetchData();
            // Then set up interval
            intervalRef.current = setInterval(fetchData, 1000);
            setIsActive(true);
        }
    };

    const stopFetching = async () => {
        if (isActive) {
            await apiService.stopGame();
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setIsActive(false);
        }
    };

    const resetFetching = async () => {
        if (isActive) {
            await apiService.resetGame();
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setIsActive(false);
        }
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    // Convert time strings to total seconds
    const timeToSeconds = (timeStr) => {
        const [hours, minutes, seconds] = timeStr.split(':').map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    };

    const leftSeconds = timeToSeconds(gameState.countdown);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    // Calculate circle properties
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    //const strokeDashoffset = circumference - (timeLeft / initialSeconds) * circumference;
    const strokeDashoffset = circumference - (timeToSeconds(gameState.countdown) / timeToSeconds(gameState.duration)) * circumference;

    // Start or pause the timer
    const toggleTimer = async () => {
        setIsRunning(!isRunning);
        if(gameState.state === "None"){
            await startFetching();
            console.log("Start game");
        }
        if(gameState.state === "Play"){
            await stopFetching();
            console.log("Pause game");
        }
        if(gameState.state === "Pause"){
            await continueFetching();
            console.log("Continue game");
        }
        setGameState(await apiService.getGameState());
        setIsReset(false);
    };

    // Reset the timer to initial countDown value
    const resetTimer = async () => {
        setIsRunning(false);
        await resetFetching();
        console.log("Reset game");
        setIsReset(true);
        clearInterval(intervalRef.current);
    };

    // Format seconds to HH:MM:SS
    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return [
            hours.toString().padStart(2, '0'),
            minutes.toString().padStart(2, '0'),
            seconds.toString().padStart(2, '0')
        ].join(':');
    };

    return (
        <div className="timer-container">
            <div
                className="timer-circle"
                style={{ width: size, height: size }}
            >
                <svg className="timer-svg" width={size} height={size}>
                    <circle
                        className="timer-circle-bg"
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        strokeWidth={strokeWidth}
                    />
                    <circle
                        className="timer-circle-progress"
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        transform={`rotate(-90 ${size / 2} ${size / 2})`}
                    />
                </svg>
                <div className="timer-text">
                    {formatTime(leftSeconds)}
                </div>
            </div>
            <div className="timer-controls">
                <button onClick={toggleTimer}>
                    {gameState.state === "Pause" || gameState.state === "None" ?
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                             className="bi bi-play-fill" viewBox="0 0 16 16">
                            <path
                                d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                             className="bi bi-pause-fill" viewBox="0 0 16 16">
                            <path
                                d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
                        </svg>
                    }
                </button>
                <button onClick={resetTimer}>
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                         width="20" height="20" viewBox="0 0 512.000000 512.000000"
                         preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                           fill="#ffffff" stroke="none">
                            <path d="M765 4671 c-51 -23 -101 -79 -114 -128 -16 -57 -15 -1143 1 -1197 16
                                -53 81 -118 134 -134 54 -16 1140 -17 1197 -1 82 22 146 111 147 202 0 71 -22
                                111 -110 202 l-81 82 69 31 c169 75 327 107 532 107 228 -1 396 -41 595 -143
                                370 -190 626 -551 692 -977 55 -357 -93 -773 -373 -1051 -449 -446 -1143 -510
                                -1663 -154 -243 166 -408 387 -510 682 -22 64 -47 131 -57 149 -29 57 -119
                                138 -191 172 -64 30 -75 32 -179 32 -107 0 -112 -1 -186 -38 -160 -78 -248
                                -233 -236 -411 11 -147 152 -489 285 -688 176 -262 377 -463 633 -630 250
                                -163 509 -265 830 -325 135 -25 563 -25 700 0 456 84 827 271 1139 572 451
                                435 687 1000 668 1600 -17 534 -224 1022 -602 1413 -171 178 -369 323 -590
                                432 -219 108 -442 175 -685 205 -194 25 -484 17 -671 -19 -253 -48 -538 -158
                                -749 -289 l-74 -47 -171 170 c-104 104 -185 175 -207 185 -50 20 -124 19 -173
                                -4z"/>
                        </g>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default TestTimer;
