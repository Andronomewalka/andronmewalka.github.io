import { getUniformLocation } from "./getUniformLocation";


export const setIntUniform = (gl: WebGL2RenderingContext, program: WebGLProgram, name: string, value: number) => {
    const loc = getUniformLocation(gl, program, name);
    gl.uniform1i(loc, value);
};

export const setFloatUniform = (gl: WebGL2RenderingContext, program: WebGLProgram, name: string, value: number) => {
    const loc = getUniformLocation(gl, program, name);
    gl.uniform1f(loc, value);
};