import { setFloatVertexAttribPointer } from "./setFloatVertexAttribPointer";


let positionLoc: number = -1;
let sizeLoc: number = -1;
let uvLoc: number = -1;

export const setBuffer = (gl: WebGL2RenderingContext, program: WebGLProgram, width: number, height: number) => {
    if (positionLoc === -1 || sizeLoc === -1 || uvLoc === -1) {
        initLocations(gl, program);
    }

    const buffer = gl.createBuffer();
    const bufferData = new Float32Array([
        -1, 1, width, height, 1, 0,
        -1, -1, width, height, 1, 1,
        1, -1, width, height, 0, 1,

        -1, 1, width, height, 1, 0,
        1, 1, width, height, 0, 0,
        1, -1, width, height, 0, 1
    ]);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, bufferData, WebGLRenderingContext.DYNAMIC_DRAW);

    setFloatVertexAttribPointer(gl, positionLoc, 2, 6, 0);
    setFloatVertexAttribPointer(gl, sizeLoc, 2, 6, 2);
    setFloatVertexAttribPointer(gl, uvLoc, 2, 6, 4);
};

const initLocations = (gl: WebGL2RenderingContext, program: WebGLProgram) => {
    positionLoc = gl.getAttribLocation(program, "position");
    sizeLoc = gl.getAttribLocation(program, "size");
    uvLoc = gl.getAttribLocation(program, "uv");
    gl.enableVertexAttribArray(positionLoc);
    gl.enableVertexAttribArray(sizeLoc);
    gl.enableVertexAttribArray(uvLoc);
};