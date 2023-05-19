import { useContext } from "react";
import { MediaStreamContext } from "./MediaStreamContext";

export const useMediaStream = () => {
    return useContext(MediaStreamContext);
};