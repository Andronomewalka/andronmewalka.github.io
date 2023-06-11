// adjust webcam revert aspect ratio to screen aspect ratio
export const getCorrectedAspectRatio = (webcamWidth: number, webcamHeight: number): number => {
    if (window.screen.availWidth > window.screen.availHeight) {
        return webcamWidth / webcamHeight;
    }

    return webcamHeight / webcamWidth;
};