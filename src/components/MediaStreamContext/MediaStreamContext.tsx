import { FC, PropsWithChildren, createContext, useCallback, useState } from "react";

type MediaStreamContextType = {
    mediaStream?: MediaStream;
    startStream: () => void;
    stopStream: () => void;
};

const mediaStreamInitValue: MediaStreamContextType = {
    startStream: () => { },
    stopStream: () => { }
};

export const MediaStreamContext = createContext<MediaStreamContextType>(mediaStreamInitValue);

export const MediaStreamProvider: FC<PropsWithChildren> = ({ children }) => {
    const [mediaStream, setMediaStream] = useState<MediaStream>();

    const startStream = useCallback(() => {
        console.log("MediaStreamProvider startStream", mediaStream);
        if (mediaStream) {
            return;
        }

        navigator.mediaDevices.getUserMedia({ video: true })
            .then((res) => {
                console.log("MediaStreamProvider set stream", res);
                setMediaStream(res);
            })
            .catch((err) => {
                console.log("err", err);
            });
    }, [mediaStream]);

    const stopStream = useCallback(() => {
        mediaStream?.getTracks().forEach(track => track.stop());
        setMediaStream(undefined);
    }, [mediaStream]);

    return (
        <MediaStreamContext.Provider value={{
            mediaStream,
            startStream,
            stopStream
        }}>
            {children}
        </MediaStreamContext.Provider>
    );
};