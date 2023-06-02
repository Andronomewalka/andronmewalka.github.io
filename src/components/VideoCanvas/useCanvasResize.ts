import { RefObject, useCallback, useLayoutEffect } from "react";

const ratio = window.screen.availWidth / window.screen.availHeight;

export const useCanvasResize = (canvasRef: RefObject<HTMLCanvasElement>) => {
    const onResize = useCallback(() => {
        const canvas = canvasRef.current;
        const canvasContainer = canvas?.parentElement;
        if (!canvas || !canvasContainer) {
            return;
        }

        const maxHeight = window.outerHeight - 180;
        const maxWidth = Math.round(maxHeight * ratio);
        canvas.style.maxWidth = `${maxWidth}px`;

        const width = Math.min(canvasContainer.clientWidth, maxWidth);
        const height = Math.round(width / ratio);

        canvas.setAttribute('width', `${width}`);
        canvas.setAttribute('height', `${height}`);
    }, [canvasRef]);

    useLayoutEffect(() => {
        onResize();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [onResize]);
};