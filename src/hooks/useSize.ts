import { useState, useEffect } from 'react';

const useSize = (): { width: number; height: number }  => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(()=>{
    const resizeWindow = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }

    window.addEventListener('resize', resizeWindow);

    return () => window.removeEventListener('resize', resizeWindow);
  },[]);

  return windowSize
};

export default useSize;
