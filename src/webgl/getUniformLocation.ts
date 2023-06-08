export const getUniformLocation = (gl: WebGL2RenderingContext, program: WebGLProgram, name: string) => {
    const loc = gl.getUniformLocation(program, name);
    if (!loc) {
        throw new Error(`getUniformLocation no loc ${name}`);
    }

    return loc;
};