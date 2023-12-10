import { useEffect, useState } from "react";

import { INPUT_DEBOUNCE, useDebounce } from "./useDebounce";


type NoteFieldDebounceReturnType<T> = [value: T, setValue: (value: T) => void];

export const useNoteFieldDebounce = <T>(value: T, onDebouncedChange: () => void): NoteFieldDebounceReturnType<T> => {
    const [innerValue, setInnerValue] = useState(value);

    useDebounce(
        innerValue,
        INPUT_DEBOUNCE,
        onDebouncedChange
    );

    useEffect(() => {
        setInnerValue(value);
    }, [value]);

    return [innerValue, setInnerValue];
};
