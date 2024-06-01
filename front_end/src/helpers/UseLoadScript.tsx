import { useState, useEffect } from 'react';
import { googleMapsApiUrl } from "../env";

const useLoadScript = (url) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.defer = true;
    console.log(googleMapsApiUrl)

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
