import { useEffect, useRef } from "react";

export default function useAutoLock(
  timeoutMs,
  onTimeout
) {
  const timer = useRef(null);

  useEffect(() => {
    const reset = () => {
      clearTimeout(timer.current);
      timer.current = setTimeout(onTimeout, timeoutMs);
    };

    reset();

    const events = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
    ];

    events.forEach((e) =>
      window.addEventListener(e, reset)
    );

    return () => {
      clearTimeout(timer.current);
      events.forEach((e) =>
        window.removeEventListener(e, reset)
      );
    };
  }, [timeoutMs, onTimeout]);
}
