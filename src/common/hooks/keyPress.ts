import {useCallback, useEffect} from 'react';

const useKeypress = (keys: number[], handler: (key: number, event: KeyboardEvent) => void) => {
    const handleKeyPress = useCallback((event) => {
        if (Array.isArray(keys) ? keys.includes(event.keyCode) : keys === event.keyCode) {
            handler?.(event.keyCode, event);
        }
    }, [keys, handler]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);
};

export default useKeypress;
