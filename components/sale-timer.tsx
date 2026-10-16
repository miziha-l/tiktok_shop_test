'use client';

import { useEffect, useState } from 'react';

function parts(seconds: number) {
  return {
    hours: String(Math.floor(seconds / 3600)).padStart(2, '0'),
    minutes: String(Math.floor((seconds % 3600) / 60)).padStart(2, '0'),
    seconds: String(seconds % 60).padStart(2, '0'),
  };
}

export function SaleTimer() {
  const [remaining, setRemaining] = useState(8 * 3600 + 42 * 60 + 17);
  useEffect(() => {
    const timer = window.setInterval(() => setRemaining((value) => value > 0 ? value - 1 : 8 * 3600), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const time = parts(remaining);
  return <div className="sale-timer"><span><b>{time.hours}</b><small>HR</small></span><i>:</i><span><b>{time.minutes}</b><small>MIN</small></span><i>:</i><span><b>{time.seconds}</b><small>SEC</small></span></div>;
}
