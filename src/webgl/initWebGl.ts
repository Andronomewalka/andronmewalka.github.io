import { createShader } from "./createShader";
import { fragmentShaderSource } from "./fragmentShaderSource";
import { vertexShaderSource } from "./vertexShaderSource";


export const initWebGl = (canvas: HTMLCanvasElement) => {
    const gl = canvas.getContext("webgl2");
    if (!gl) {
        return;
    }

    const program = gl.createProgram();
    if (!program) {
        return;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!fragmentShader || !vertexShader) {
        return;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.log(gl.getShaderInfoLog(vertexShader));
        console.log(gl.getShaderInfoLog(fragmentShader));
    }

    gl.useProgram(program);

    gl.drawArrays(gl.POINTS, 0, 1);
};