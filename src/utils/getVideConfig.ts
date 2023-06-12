export const getVideConfig = (): MediaTrackConstraints => {
    const isLandscape = window.screen.availWidth > window.screen.availHeight;
    return {
        width: { ideal: isLandscape ? 4096 : 2160 },
        height: { ideal: isLandscape ? 2160 : 4096 },
        aspectRatio: isLandscape ? 16 / 9 : 9 / 16
    };

};