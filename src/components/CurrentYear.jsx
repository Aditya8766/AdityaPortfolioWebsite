import { useEffect, useState } from 'react';

export default function CurrentYear() {
  const [year, setYear] = useState(() => new Date().getFullYear());
  useEffect(() => {
    let timer;
    const update = () => {
      setYear(new Date().getFullYear());
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      clearTimeout(timer);
      timer = setTimeout(update, midnight.getTime() - Date.now() + 50);
    };
    update();
    window.addEventListener('focus', update);
    document.addEventListener('visibilitychange', update);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('focus', update);
      document.removeEventListener('visibilitychange', update);
    };
  }, []);
  return <time dateTime={String(year)}>{year}</time>;
}
