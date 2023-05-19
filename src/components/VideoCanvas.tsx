import { FC, useEffect, useRef } from "react";
import { useMediaStream } from "./MediaStreamContext/useMediaStream";
import { loadImage } from "../utils/loadImage";
import { processWebGl, setRectangle } from "../utils/processWebGl";

export const VideoCanvas: FC = () => {
    const { mediaStream } = useMediaStream();
    const refCanvas = useRef<HTMLCanvasElement>(null);

    // useEffect(() => {
    //     if (!mediaStream) {
    //         return;
    //     }

    //     loadImage("kitty.jpg").then(img => {
    //         if (!refCanvas.current) {
    //             return;
    //         }
    //         processWebGl(refCanvas.current, img);
    //     });
    // }, [mediaStream]);

    // useEffect(() => {
    //     // if (!mediaStream) {
    //     //     return;
    //     // }

    //     (async () => {
    //         const image = await loadImage("kitty.jpg");
    //         const gl = refCanvas.current?.getContext("webgl2");
    //         if (!gl) {
    //             return;
    //         }

    //         const texture = gl.createTexture();
    //         gl.activeTexture(gl.TEXTURE0 + 0);
    //         gl.bindTexture(gl.TEXTURE_2D, texture);
    //         gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

    //         // more info about these parameters in the webglfundamentals
    //         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    //         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    //         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    //         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    //         const positionBuffer = gl.createBuffer();

    //         // Bind the position buffer so gl.bufferData that will be called
    //         // in setRectangle puts data in the position buffer
    //         gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    //         setRectangle(gl, 0, 0, image.width, image.height);
    //         gl.drawArrays(gl.TRIANGLES, 0, 6);
    //     })();
    // }, []);




    // useEffect(() => {
    //     const onStopTrack = () => {
    //         if (!refVideo.current) {
    //             return;
    //         }
    //         refVideo.current.srcObject = null;
    //     };

    //     mediaStream?.addEventListener("removetrack", onStopTrack);
    //     return () => mediaStream?.removeEventListener("removetrack", onStopTrack);
    // }, [mediaStream]);


    return (
        <canvas ref={refCanvas} width={450} height={250} />
    );
};