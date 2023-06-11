import { RefObject, useCallback, useLayoutEffect } from "react";
import { StreamSettings } from "../../state/mediaStreamAtom";

const bottomHeightFallback = 88;

export const useCanvasResize = (
    canvasRef: RefObject<HTMLCanvasElement>,
    streamSettings: StreamSettings,
    onResize: () => void
) => {
    const onResizeInternal = useCallback(() => {
        const canvas = canvasRef.current;
        const canvasContainer = canvas?.parentElement;
        if (!canvas || !canvasContainer) {
            return;
        }

        const videoButtons = document.querySelector<HTMLDivElement>(`[data-video-buttons]`);
        const bottomHeight = videoButtons?.offsetHeight ?? bottomHeightFallback;

        const maxHeight = window.innerHeight - bottomHeight;
        const maxWidth = Math.round(maxHeight * streamSettings.aspectRatio);
        canvas.style.maxWidth = `${maxWidth}px`;

        const width = Math.min(canvasContainer.clientWidth, maxWidth);
        const height = Math.round(width / streamSettings.aspectRatio);

        canvas.width = Math.floor(width * window.devicePixelRatio);
        canvas.height = Math.floor(height * window.devicePixelRatio);

        onResize?.();
    }, [canvasRef, onResize, streamSettings.aspectRatio]);

    useLayoutEffect(() => {
        onResizeInternal();
        window.addEventListener("resize", onResizeInternal);
        return () => window.removeEventListener("resize", onResizeInternal);
    }, [onResizeInternal]);

    return onResizeInternal;
};