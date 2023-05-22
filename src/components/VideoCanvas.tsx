import { FC, useEffect, useRef } from "react";
import { setup } from "../webgl/camText";
import { useMediaStream } from "./MediaStreamContext/useMediaStream";


export const VideoCanvas: FC = () => {
    const { mediaStream } = useMediaStream();

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const videoRef = useRef<HTMLVideoElement>();
    if (!videoRef.current) {
        videoRef.current = document.createElement("video");
        videoRef.current.autoplay = true;
    }

    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!canvas || !video || !mediaStream) {
            return;
        }

        video.srcObject = mediaStream;

        const onVideoReady = () => {
            setup(canvas, video);
        };

        video.addEventListener("loadedmetadata", onVideoReady);
        return video.removeEventListener("onloadedmetadata", onVideoReady);
    }, [mediaStream]);

    useEffect(() => {
        const onRemoveTrack = () => {
            if (!videoRef.current) {
                return;
            }

            videoRef.current.srcObject = null;
        };

        mediaStream?.addEventListener("removetrack", onRemoveTrack);
        return mediaStream?.removeEventListener("removetrack", onRemoveTrack);
    }, [mediaStream]);

    return (
        <canvas ref={canvasRef} width={640} height={480} style={{ border: "1px solid grey" }} />
    );
};