import {useState, useEffect} from 'react';

const useDebounce = (searchKey: string, delay: number) => {
    const [decouncedVal, setDebouncedVal] = useState(searchKey);
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setDebouncedVal(searchKey);
        },delay);

        return () => clearTimeout(timer);
    },[searchKey, delay]);

    return decouncedVal;
};

export default useDebounce;