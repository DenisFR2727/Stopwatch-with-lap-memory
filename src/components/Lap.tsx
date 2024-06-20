import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { ITime } from "./StopWatch";

import "./stopwatch.scss";

interface TimeProps {
  lap: ITime[];
  format: (num: number) => string;
}

function Lap({ lap, format }: PropsWithChildren<TimeProps>) {
  const lapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lapRef.current) {
      lapRef.current.scrollTop = lapRef.current.scrollHeight;
    }
  }, [lap]);
  useEffect(() => {
    console.log(lap);
  }, [lap]);

  const calculateTotalTime = (laps: ITime[], index: number): string => {
    let totalMilliseconds = 0;
    for (let i = 0; i <= index; i++) {
      totalMilliseconds += laps[i].hours * 3600000;
      totalMilliseconds += laps[i].minutes * 60000;
      totalMilliseconds += laps[i].seconds * 1000;
      totalMilliseconds += laps[i].milliseconds;
    }

    const hours = Math.floor(totalMilliseconds / 3600000)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((totalMilliseconds % 3600000) / 60000)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((totalMilliseconds % 60000) / 1000)
      .toString()
      .padStart(2, "0");
    const milliseconds = (totalMilliseconds % 1000).toString().padStart(3, "0");

    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  };
  return (
    <div className="lap-time">
      <div className="name-lap">
        <p>Lap</p>
        <p>Time</p>
        <p>Total Time</p>
      </div>
      <div className="lap" ref={lapRef}>
        {lap.map((t: ITime, ind: number) => {
          const currentTime = `${format(t.hours)}:${format(t.minutes)}:${format(
            t.seconds
          )}.${format(t.milliseconds)}`;
          return (
            <div className="lap-list" key={ind}>
              <li>Lap {ind + 1}</li>
              <li>{currentTime}</li>
              <li>{calculateTotalTime(lap, ind)}</li>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(Lap);
