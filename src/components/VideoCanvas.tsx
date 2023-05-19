import { FC, useEffect, useRef } from "react";
import { initWebGl } from "../webgl/initWebGl";

export const VideoCanvas: FC = () => {
    const refCanvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!refCanvas.current) {
            return;
        }

        initWebGl(refCanvas.current);
    }, []);


    return (
        <canvas ref={refCanvas} width={450} height={250} />
    );
};