import { useState, useEffect } from 'react';

const useLoadScript = (url) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      setScriptLoaded(true);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);

  return scriptLoaded;
};

export default useLoadScript;
