import { useEffect, useRef } from "react";


export const INPUT_DEBOUNCE = 300;

export const useDebounce = <T>(value: T, delay: number, onChange: (value: T) => void) => {
    const isFirstRender = useRef(true);
    const onChangeRef = useRef(onChange);
    onChangeRef.current = onChange;

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const handler = setTimeout(() => {
            onChangeRef.current?.(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [delay, value]);
};

