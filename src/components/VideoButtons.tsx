import { FC } from "react";
import { useMediaStream } from "./MediaStreamContext/useMediaStream";

export const VideoButtons: FC = () => {
    const { mediaStream, startStream, stopStream } = useMediaStream();

    const onClick = () => {
        if (mediaStream) {
            stopStream();
        } else {
            startStream();
        }
    };

    return (
        <button onClick={onClick}>{mediaStream ? "stop" : "start"}</button>
    );
}; 
