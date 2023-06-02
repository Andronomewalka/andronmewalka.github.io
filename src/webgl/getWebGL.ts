import { createShader } from "./createShader";


let gl: WebGL2RenderingContext | null = null;
let program: WebGLProgram | null = null;

export const getWebGL = (
    canvas: HTMLCanvasElement,
    vertexShaderSource: string,
    fragmentShaderSource: string,
) => {
    if (!gl || !program) {
        initWebGl(canvas, vertexShaderSource, fragmentShaderSource);
    }

    return { gl, program };
};

const initWebGl = (
    canvas: HTMLCanvasElement,
    vertexShaderSource: string,
    fragmentShaderSource: string
) => {
    gl = canvas.getContext("webgl2");
    if (!gl) {
        return;
    }

    program = gl.createProgram();
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
};
