import { useAtom } from "jotai";
import { RefObject, useEffect } from "react";
import { controlsAtom } from "../../state/controlsAtom";
import { updateUniforms } from "../../webgl/camText";

export const useOnUpdateControls = (canvasRef: RefObject<HTMLCanvasElement>) => {
    const [controls] = useAtom(controlsAtom);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }

        updateUniforms(canvas, controls);
    }, [canvasRef, controls]);
};