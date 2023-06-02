import { setActiveTexture } from "../utils/setActiveTexture";
import { setFloatUniform } from "../utils/setUniform";
import { getCamTexture } from "./getCamTexture";
import { getWebGL } from "./getWebGL";
import { setBuffer } from "./setBuffer";


const glsl = (x: any) => x;

const vert = glsl`#version 300 es
    #pragma vscode_glsllint_stage: vert

    precision mediump float;

    in vec2 position;
    in vec2 size;
    in vec2 uv;

    out vec2 fSize;
    out vec2 fUv;

    void main () {
        fSize = size;
        fUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
    }
`;


const frag = glsl`#version 300 es
    #pragma vscode_glsllint_stage: frag

    precision highp float;

    uniform sampler2D camTexture;
    uniform float saturation;
    uniform float warmth;

    in vec2 fSize;
    in vec2 fUv;

    out vec4 fragColor;

    const int zoom = 1;

    // normalize coords and correct for aspect ratio
    vec2 normalizeScreenCoords()
    {
      float aspectRatio = fSize.x / fSize.y;
      vec2 result = 2.0 * (gl_FragCoord.xy / fSize - 0.5);
      result.x *= aspectRatio;
      return result;
    }

    vec2 camCoord(vec2 coord) {
      return 1.0 - coord / fSize;
    } 

    vec3 saturationVector = vec3(0.299, 0.587, 0.114);

    void main() {
      vec2 p = normalizeScreenCoords();
      vec2 coord = 1.0 - gl_FragCoord.xy / fSize;

      vec4 tex = texture(camTexture, fUv + vec2(0.0, 0.0));
      vec3 desaturated = vec3(dot(saturationVector, tex.rgb));
      vec3 mixed = mix(desaturated, tex.rgb, saturation);
      vec4 color = vec4(mixed, tex.a);

      color.r += warmth;
      color.b -= warmth;

      fragColor = color;
    }
`;


let stop: boolean = false;

export const streamLoop = (
    gl: WebGL2RenderingContext,
    program: WebGLProgram,
    canvas: HTMLCanvasElement,
    video: HTMLVideoElement
) => {
    if (stop) {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        return;
    }

    const camTexture = getCamTexture(gl, program, video);
    if (!camTexture) {
        return;
    }

    setBuffer(gl, program, canvas.width, canvas.height);

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);



    setActiveTexture(gl, 0, camTexture);
    gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, video);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.flush();

    requestAnimationFrame(() => streamLoop(gl, program, canvas, video));
};

export async function startStreamToCanvas(canvas: HTMLCanvasElement, video: HTMLVideoElement) {
    stop = false;

    const { gl, program } = getWebGL(canvas, vert, frag);
    if (!gl || !program) {
        return;
    }

    setFloatUniform(gl, program, "saturation", 0);
    setFloatUniform(gl, program, "warmth", 0.2);
    streamLoop(gl, program, canvas, video);
}

export const stopStreamToCanvas = () => {
    stop = true;
};