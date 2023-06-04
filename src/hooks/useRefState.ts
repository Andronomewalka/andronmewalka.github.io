import { useRef } from "react";

export const useRefState = <T>(state: T) => {
    const ref = useRef(state);
    ref.current = state;
    return ref;
};