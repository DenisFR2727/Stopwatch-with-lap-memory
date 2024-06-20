import { useState, useEffect } from "react";
import Lap from "./Lap";

import "./stopwatch.scss";

export interface ITime {
  milliseconds: number;
  seconds: number;
  minutes: number;
  hours: number;
}
function StopWatch() {
  const [time, setTime] = useState<ITime>({
    milliseconds: 0,
    seconds: 0,
    minutes: 0,
    hours: 0,
  });
  const [lap, setLap] = useState<ITime[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const formatWithZero = (value: number): string => {
    if (value < 10) {
      return "0" + value;
    }
    return value.toString();
  };
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          let { milliseconds, seconds, minutes, hours }: ITime = prevTime;
          milliseconds++;
          if (milliseconds >= 100) {
            milliseconds = 0;
            seconds++;
            if (seconds >= 60) {
              seconds = 0;
              minutes++;
              if (minutes >= 60) {
                minutes = 0;
                hours++;
              }
            }
          }
          return { milliseconds, seconds, minutes, hours };
        });
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = (): void => {
    setIsRunning(true);
  };
  const handlePause = (): void => {
    setIsRunning(false);
  };
  const handleReset = (): void => {
    setTime((prev) => ({
      ...prev,
      milliseconds: 0,
      seconds: 0,
      minutes: 0,
      hours: 0,
    }));
    setLap([]);
  };
  const handleLap = (): void => {
    setLap((prevLap) => [...prevLap, { ...time }]);
  };

  return (
    <div className="container">
      <div className="timeDisplay" style={{ display: "flex" }}>
        {formatWithZero(time.hours)}:{formatWithZero(time.minutes)}:
        {formatWithZero(time.seconds)}:{formatWithZero(time.milliseconds)}
      </div>
      <div className="btns-stopwatch">
        <button disabled={isRunning} onClick={handleStart}>
          Start
        </button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleLap}>Lap</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <Lap lap={lap} format={formatWithZero} />
    </div>
  );
}

export default StopWatch;
