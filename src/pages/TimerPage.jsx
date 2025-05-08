import {useState, useEffect, useRef} from 'react';
import '../Timer.css';
import ApiService from "../services/ApiService.js";
export const apiService = new ApiService();

function TimerPage({countDown = 45, duration = 60} = {}) { // in minutes

    const size = 200;
    const strokeWidth = 10;
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef(null);

    // Calculate circle properties
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (timeLeft / duration) * circumference;

    // Start or pause the timer
    const toggleTimer = async () => {
        setIsRunning(!isRunning);
        setIsPaused(isRunning);
    };

    // Reset the timer
    const resetTimer = async () => {
        setIsRunning(false);
        setTimeLeft(countDown);
        clearInterval(intervalRef.current);
    };

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime <= 0.1) {
                        clearInterval(intervalRef.current);
                        setIsRunning(false);
                        return 0;
                    }
                    return prevTime - 0.1;
                });
            }, 100);
        } else {
            clearInterval(intervalRef.current);
            if(!isPaused) setTimeLeft(countDown);
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning]);

    // Format time as MM:SS.S
    const formatTime = (time2) => {
        let time = time2 * 60;
        const minutes = Math.floor(time / 60);
        const seconds = (time % 60).toFixed(1);
        return `${minutes.toString().padStart(2, '0')}:${seconds.padStart(4, '0')}`;
    };

    return (
        <div className="timer-container">
            <div
                className="timer-circle"
                style={{width: size, height: size}}
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
                    {formatTime(timeLeft)}
                </div>
            </div>
            <div className="timer-controls">
                <button onClick={toggleTimer}>
                    {isRunning ?
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                             className="bi bi-pause-fill" viewBox="0 0 16 16">
                            <path
                                d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                             className="bi bi-play-fill" viewBox="0 0 16 16">
                            <path
                                d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
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
}

export default TimerPage;
