export const loadImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve: (image: HTMLImageElement) => void, reject: (arg: string | Event) => void) => {
        const image: HTMLImageElement = new Image();

        image.onload = () => { resolve(image); };
        image.onerror = error => { reject(error); };
        image.src = url;
    });
};