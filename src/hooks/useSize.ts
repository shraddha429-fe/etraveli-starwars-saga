import { useState, useEffect } from 'react';

const useSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(()=>{
    const resizeWindow = () => {
        setWindowSize({
            width: window.innerHeight,
            height: window.innerHeight
        })
    }

    window.addEventListener('resize', resizeWindow);

    return () => window.removeEventListener('resize', resizeWindow);
  },[]);

  return windowSize
};

export default useSize;
