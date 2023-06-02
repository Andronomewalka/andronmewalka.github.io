import { FC, useEffect, useRef } from "react";
import { startStreamToCanvas, stopStreamToCanvas } from "../../webgl/camText";
import { useMediaStream } from "../MediaStreamContext/useMediaStream";
import { useCanvasResize } from "./useCanvasResize";


export const VideoCanvas: FC = () => {
    const { mediaStream } = useMediaStream();

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const videoRef = useRef<HTMLVideoElement>();
    if (!videoRef.current) {
        videoRef.current = document.createElement("video");
        videoRef.current.autoplay = true;
    }

    useCanvasResize(canvasRef);

    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!canvas || !video || !mediaStream) {
            return;
        }

        video.srcObject = mediaStream;
        if (!canvasRef.current.parentElement) {
            return;
        }

        const onVideoReady = () => {
            console.log("onVideoReady");
            startStreamToCanvas(canvas, video);

            const weirdH1s = document.getElementsByTagName("h1");
            if (weirdH1s.length > 0) {
                document.body.removeChild(weirdH1s[0]); // no idea why it adds on start webgl
            }
        };

        video.addEventListener("loadedmetadata", onVideoReady);
        return () => video.removeEventListener("loadedmetadata", onVideoReady);
    }, [mediaStream]);

    useEffect(() => {
        if (!mediaStream) {
            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }
            stopStreamToCanvas();
        }
    }, [mediaStream]);

    return (
        <div className="w-full flex justify-center items-center">
            <canvas className="w-full" ref={canvasRef} />
        </div>

    );
};