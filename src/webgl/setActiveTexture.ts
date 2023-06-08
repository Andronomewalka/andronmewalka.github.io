export const setActiveTexture = (gl: WebGL2RenderingContext, textureIndex: number, texture: WebGLTexture) => {
    if (!gl || !texture) {
        return;
    }

    gl.activeTexture(gl.TEXTURE0 + textureIndex);
    gl.bindTexture(gl.TEXTURE_2D, texture);
};