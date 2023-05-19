export const createShader = (gl: WebGL2RenderingContext, shader: number, source: string) => {
    const vertexShader = gl.createShader(shader);
    if (!vertexShader) {
        return;
    }

    gl.shaderSource(vertexShader, source);
    gl.compileShader(vertexShader);
    return vertexShader;
};