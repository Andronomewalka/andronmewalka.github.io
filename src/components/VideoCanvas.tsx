import { FC, useEffect, useRef } from "react";
import { initWebGl } from "../webgl/initWebGl";
import { setup } from "../webgl/camText";

export const VideoCanvas: FC = () => {
    const refCanvas = useRef<HTMLCanvasElement>(null);
    const refVideo = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // if (!refCanvas.current) {
        //     return;
        // }

        if (!refVideo.current) {
            return;
        }

        // initWebGl(refCanvas.current);
        setup(refVideo.current);
    }, []);


    return (
        <>
            <canvas id="canv"></canvas>
            <video ref={refVideo}></video>
        </>
        // <canvas ref={refCanvas} width={450} height={250} style={{ border: "1px solid grey" }} />
    );
};