import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
    const [debounceValue, setDebounceValue] = useState('');

    useEffect(() => {
        const debounceID = setTimeout(() => setDebounceValue(value), delay);

        return () => clearTimeout(debounceID);
    }, [value, delay]);
    return debounceValue;
}

export default useDebounce;
