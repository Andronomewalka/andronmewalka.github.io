export const getVideConfig = (): MediaTrackConstraints => {
    const isLandscape = window.screen.availWidth > window.screen.availHeight;
    return {
        width: { ideal: isLandscape ? 1920 : 1080 },
        height: { ideal: isLandscape ? 1080 : 1920 },
        frameRate: { ideal: 60 },
        facingMode: "user"
    };

};