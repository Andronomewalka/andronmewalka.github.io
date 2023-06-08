import { setActiveTexture } from "./setActiveTexture";


export const createTexture = (
    gl: WebGL2RenderingContext,
    textureIndex = 0,
    params: Record<string, string> = {
        textureWrapS: 'clampToEdge',
        textureWrapT: 'clampToEdge',
        textureMinFilter: 'nearest',
        textureMagFilter: 'nearest',
    }
) => {
    const scream = (str = '') =>
        /^[A-Z0-9_]+$/.test(str)
            ? str
            : str.replace(/([A-Z])/g, '_$1').toUpperCase();
    const texture = gl.createTexture() as WebGLTexture;
    setActiveTexture(gl, textureIndex, texture);
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            const KEY = scream(key);
            const VAL = scream(params[key]);
            if (KEY in gl && VAL in gl) {
                // @ts-ignore indexing gl by string
                gl.texParameteri(gl.TEXTURE_2D, gl[KEY], gl[VAL]);
            }
        }
    }
    return texture;
};