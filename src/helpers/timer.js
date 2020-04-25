import React, { useEffect, useState } from "react";

const Timer = ({ time, paused }) => {
  const data = time && time.split(":");
  let h = parseInt(data && data[0], 10);
  let m = parseInt(data && data[1], 10);
  let s = parseInt(data && data[2], 10);
  const [t, setT] = useState({
    hours: h,
    minutes: m,
    seconds: s,
  });

  const tick = () => {
    // if (!paused) return;
    if (h > 0 && m === 0 && s === 0) {
      setT({
        hours: t.hours - 1,
        minutes: 59,
        seconds: 59,
      });
    } else if (s === 0) {
      setT({
        hours: t.hours,
        minutes: t.minutes - 1,
        seconds: 59,
      });
    } else {
      setT({
        minutes: t.minutes,
        seconds: t.seconds - 1,
      });
    }
  };

  useEffect(() => {
    let timer;
    if (paused) {
      timer = setInterval(() => tick(), 1000);
      return () => clearInterval(timer);
    }
  }, [paused, tick]);
  return (
    <div>
      {t.hours.toString().padStart(2, "0") +
        ":" +
        t.minutes.toString().padStart(2, "0") +
        ":" +
        t.seconds.toString().padStart(2, "0")}
    </div>
  );
};

export default Timer;
