import { useEffect } from 'react';
import SeoMeta from './SeoMeta';

const visibleIcon = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTkuNCAxNi42TDQuOCAxMmw0LjYtNC42TDggNmwtNiA2IDYgNiAxLjQtMS40em01LjIgMEwxOS4yIDEybC00LjYtNC42TDE2IDZsNiA2LTYgNi0xLjQtMS40eiIvPjwvc3ZnPg==';
const hiddenIcon = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2ZmMDAwMCI+PHBhdGggZD0iTTEyIDIxLjM1bC0xLjQ1LTEuMzJDNS40IDE1LjM2IDIgMTIuMjggMiA4LjUgMiA1LjQyIDQuNDIgMyA3LjUgM2MxLjc0IDAgMy40MS44MSA0LjUgMi4wOUMxMy4wOSAzLjgxIDE0Ljc2IDMgMTYuNSAzIDE5LjU4IDMgMjIgNS40MiAyMiA4LjVjMCAzLjc4LTMuNCA2Ljg2LTguNTUgMTEuNTRMMTIgMjEuMzV6Ii8+PC9zdmc+';

export default function DynamicFavicon() {
  useEffect(() => {
    const handleVisibilityChange = () => {
      const favicon = document.querySelector('link[rel="icon"]');
      if (favicon) favicon.href = document.hidden ? hiddenIcon : visibleIcon;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) favicon.href = '/favicon.svg';
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);
  return <SeoMeta />;
}
