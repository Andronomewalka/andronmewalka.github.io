import { ControlsType, initControls } from "../state/controlsAtom";
import { setActiveTexture } from "./setActiveTexture";
import { setFloatUniform } from "./setUniform";
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
    uniform float brightness;
    uniform float contrast;
    uniform float sharpen;
    uniform float hue;
    uniform float blur;
    uniform float warmth;
    uniform float cold;

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

    vec3 hueShift(vec3 color, float hue) {
        const vec3 k = vec3(0.57735, 0.57735, 0.57735);
        float cosAngle = cos(hue);
        return vec3(color * cosAngle + cross(k, color) * sin(hue) + k * dot(k, color) * (1.0 - cosAngle));
    }

    vec3 saturationVector = vec3(0.299, 0.587, 0.114);
    vec3 greyVec = vec3(0.5, 0.5, 0.5);

    void main() {
        vec2 p = normalizeScreenCoords();
        vec2 coord = 1.0 - gl_FragCoord.xy / fSize;

        vec2 off = vec2(1.0 / fSize.x, 1.0 / fSize.y) * blur;
        vec2 off2 = off * 2.0;

        vec4 tex00 = texture(camTexture, fUv + vec2(-off2.x, -off2.y));
        vec4 tex10 = texture(camTexture, fUv + vec2(-off.x, -off2.y));
        vec4 tex20 = texture(camTexture, fUv + vec2(0.0, -off2.y));
        vec4 tex30 = texture(camTexture, fUv + vec2(off.x, -off2.y));
        vec4 tex40 = texture(camTexture, fUv + vec2(off2.x, -off2.y));
        
        vec4 tex01 = texture(camTexture, fUv + vec2(-off2.x, -off.y));
        vec4 tex11 = texture(camTexture, fUv + vec2(-off.x, -off.y));
        vec4 tex21 = texture(camTexture, fUv + vec2(0.0, -off.y));
        vec4 tex31 = texture(camTexture, fUv + vec2(off.x, -off.y));
        vec4 tex41 = texture(camTexture, fUv + vec2(off2.x, -off.y));
        
        vec4 tex02 = texture(camTexture, fUv + vec2(-off2.x, 0.0));
        vec4 tex12 = texture(camTexture, fUv + vec2(-off.x, 0.0));
        vec4 tex22 = texture(camTexture, fUv + vec2(0.0, 0.0));
        vec4 tex32 = texture(camTexture, fUv + vec2(off.x, 0.0));
        vec4 tex42 = texture(camTexture, fUv + vec2(off2.x, 0.0));
        
        vec4 tex03 = texture(camTexture, fUv + vec2(-off2.x, off.y));
        vec4 tex13 = texture(camTexture, fUv + vec2(-off.x, off.y));
        vec4 tex23 = texture(camTexture, fUv + vec2(0.0, off.y));
        vec4 tex33 = texture(camTexture, fUv + vec2(off.x, off.y));
        vec4 tex43 = texture(camTexture, fUv + vec2(off2.x, off.y));
        
        vec4 tex04 = texture(camTexture, fUv + vec2(-off2.x, off2.y));
        vec4 tex14 = texture(camTexture, fUv + vec2(-off.x, off2.y));
        vec4 tex24 = texture(camTexture, fUv + vec2(0.0, off2.y));
        vec4 tex34 = texture(camTexture, fUv + vec2(off.x, off2.y));
        vec4 tex44 = texture(camTexture, fUv + vec2(off2.x, off2.y));

        vec4 tex = tex22;

         vec4 blurred = 1.0 * tex00 + 4.0 * tex10 + 6.0 * tex20 + 4.0 * tex30 + 1.0 * tex40
            + 4.0 * tex01 + 16.0 * tex11 + 24.0 * tex21 + 16.0 * tex31 + 4.0 * tex41
            + 6.0 * tex02 + 24.0 * tex12 + 36.0 * tex22 + 24.0 * tex32 + 6.0 * tex42
            + 4.0 * tex03 + 16.0 * tex13 + 24.0 * tex23 + 16.0 * tex33 + 4.0 * tex43
            + 1.0 * tex04 + 4.0 * tex14 + 6.0 * tex24 + 4.0 * tex34 + 1.0 * tex44;

        blurred /= 256.0;
        tex += (tex - blurred) * sharpen;

        vec3 desaturated = vec3(dot(saturationVector, tex.rgb));
        vec3 mixed = mix(desaturated, tex.rgb, saturation);
        vec4 color = vec4(mixed, tex.a);

        color.rgb = mix(color.rgb * brightness, mix(greyVec, color.rgb, contrast), 0.5);
        color.rbg = hueShift(color.rgb, hue);

        color.r += warmth - cold;
        color.b -= warmth + cold;

        fragColor = color;
    }
`;


let stop: boolean = false;

const streamLoop = (
    gl: WebGL2RenderingContext,
    program: WebGLProgram,
    canvas: HTMLCanvasElement,
    video: HTMLVideoElement
) => {
    if (stop) {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.flush();
        return;
    }

    const camTexture = getCamTexture(gl, program, video);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    setActiveTexture(gl, 0, camTexture);
    gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, video);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    gl.flush();

    requestAnimationFrame(() => streamLoop(gl, program, canvas, video));
};

export const startStreamToCanvas = (canvas: HTMLCanvasElement, video: HTMLVideoElement, controls?: ControlsType) => {
    stop = false;
    const { gl, program } = getWebGL(canvas, vert, frag);
    updateBuffer(canvas);
    updateUniforms(canvas, controls);
    streamLoop(gl, program, canvas, video);
};

export const stopStreamToCanvas = () => {
    stop = true;
};

export const updateBuffer = (canvas: HTMLCanvasElement) => {
    const { gl, program } = getWebGL(canvas, vert, frag);
    setBuffer(gl, program, canvas.width, canvas.height);
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
};

export const updateUniforms = (canvas: HTMLCanvasElement, controls?: ControlsType) => {
    const { gl, program } = getWebGL(canvas, vert, frag);
    const source = controls ?? initControls;
    setFloatUniform(gl, program, "saturation", source.saturation);
    setFloatUniform(gl, program, "brightness", source.brightness);
    setFloatUniform(gl, program, "contrast", source.contrast);
    setFloatUniform(gl, program, "sharpen", source.sharpen);
    setFloatUniform(gl, program, "hue", source.hue);
    setFloatUniform(gl, program, "blur", source.blur);
    setFloatUniform(gl, program, "warmth", source.warmth);
    setFloatUniform(gl, program, "cold", source.cold);
};