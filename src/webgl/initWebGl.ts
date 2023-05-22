import { createShader } from "./createShader";


export const initWebGl = (
    canvas: HTMLCanvasElement,
    vertexShaderSource: string,
    fragmentShaderSource: string
) => {
    const gl = canvas.getContext("webgl2");
    if (!gl) {
        return {};
    }

    const program = gl.createProgram();
    if (!program) {
        return {};
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!fragmentShader || !vertexShader) {
        return {};
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.log(gl.getShaderInfoLog(vertexShader));
        console.log(gl.getShaderInfoLog(fragmentShader));
    }

    gl.useProgram(program);

    return { gl, program };

    // const bufferData = new Float32Array([
    //     0, 0, 100
    // ]);

    // const aPositionLoc = gl.getAttribLocation(program, "aPosition");
    // const aPointSizeLoc = gl.getAttribLocation(program, "aPointSize");

    // gl.enableVertexAttribArray(aPositionLoc);
    // gl.enableVertexAttribArray(aPointSizeLoc);

    // const buffer = gl.createBuffer();
    // gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    // gl.bufferData(gl.ARRAY_BUFFER, bufferData, gl.STATIC_DRAW);

    // gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 3 * 4, 0);
    // gl.vertexAttribPointer(aPointSizeLoc, 1, gl.FLOAT, false, 3 * 4, 2 * 4);

    // const uIndex = gl.getUniformLocation(program, "uIndex");
    // gl.uniform1i(uIndex, 0);

    // const uColorsLoc = gl.getUniformLocation(program, "uColors");
    // gl.uniform4fv(uColorsLoc, [
    //     1, 0, 0, 1,
    //     0, 1, 0, 1,
    //     0, 0, 1, 1
    // ]);

    // gl.drawArrays(gl.POINTS, 0, 1);
};