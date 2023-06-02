import { RefObject, useCallback, useLayoutEffect } from "react";

const ratio = window.screen.availWidth / window.screen.availHeight;

export const useCanvasResize = (canvasRef: RefObject<HTMLCanvasElement>) => {
    const onResize = useCallback(() => {
        const canvas = canvasRef.current;
        const canvasContainer = canvas?.parentElement;
        if (!canvas || !canvasContainer) {
            return;
        }

        const width = canvasContainer.clientWidth;
        const height = Math.round(canvasContainer.clientWidth / ratio);

        canvas.setAttribute('width', `${width}`);
        canvas.setAttribute('height', `${height}`);
    }, [canvasRef]);

    useLayoutEffect(() => {
        onResize();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [onResize]);
};