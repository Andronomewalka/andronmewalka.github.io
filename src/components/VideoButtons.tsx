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
        <div className="flex justify-center items-center p-6">
            <button
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                onClick={onClick}
            >
                {mediaStream ? "Stop" : "Start"}
            </button>
        </div>

    );
}; 
