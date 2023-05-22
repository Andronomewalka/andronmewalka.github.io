import { setActiveTexture } from "../utils/setActiveTexture";
import { setIntUniform, setFloatUniform } from "../utils/setUniform";
import { createTexture } from "./createTexture";
import { initWebGl } from "./initWebGl";


const glsl = (x: any) => x;

const frag = glsl`
    #pragma vscode_glsllint_stage: frag
    precision highp float;

    uniform float width;
    uniform float height;

    uniform sampler2D camTexture;

    const int zoom = 1;

    // normalize coords and correct for aspect ratio
    vec2 normalizeScreenCoords()
    {
      float aspectRatio = width / height;
      vec2 result = 2.0 * (gl_FragCoord.xy / vec2(width, height) - 0.5);
      result.x *= aspectRatio;
      return result;
    }

    vec2 camCoord(vec2 coord) {
      return 1.0 - coord / vec2(width, height);
    } 

    void main() {
      vec2 p = normalizeScreenCoords();
      vec2 coord = 1.0 - gl_FragCoord.xy / vec2(width, height);
    
    
      gl_FragColor = texture2D(camTexture, coord);
    //   gl_FragColor = averageBlockColor(); // texture2D(camTexture, coord);
    
      // display a single character from the charset (in a 16x16 table)
    
      //float chX = 2.;
      //float chY = 11.;
      //vec2 fontCoord = vec2((chX * 8. + mod(gl_FragCoord.x / 8., 8.)) / 128., (chY * 8. + (8. - mod(gl_FragCoord.y / 8., 8.))) / 128.);
      //gl_FragColor = texture2D(fontTexture, fontCoord);
    
      //float chX = 0.;
      //float chY = 1.;
      //vec2 lumCoord = vec2((chX * 2. + mod(gl_FragCoord.x / 8., 2.)) / 32., (chY * 2. + (2. - mod(gl_FragCoord.y / 8., 2.))) / 32.);
      //gl_FragColor = texture2D(lumTexture, lumCoord);
    
    
    }
`;

const vert = glsl`
    #pragma vscode_glsllint_stage: vert
    precision mediump float;
    attribute vec2 position;

    void main () {
        gl_Position = vec4(position, 0.0, 1.0);
    }
`;

let camTexture: any = null;
// let fontTexture: any = null;
// let lumTexture: any = null;

// const glea = new GLea({
//     glOptions: {
//         preserveDrawingBuffer: true
//     },
//     shaders: [
//         GLea.fragmentShader(frag),
//         GLea.vertexShader(vert)
//     ],
//     buffers: {
//         'position': GLea.buffer(2, [1, 1, -1, 1, 1, -1, -1, -1])
//     }
// }).create();

// window.addEventListener('resize', () => {
//     glea.resize();
// });

function loop(gl: WebGL2RenderingContext, program: WebGLProgram, video: HTMLVideoElement) {
    // console.log("time", time);
    // Upload the image into the texture.
    if (video) {
        setActiveTexture(gl, 0, camTexture);
        gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, video);
    }

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    setFloatUniform(gl, program, "width", 640);
    setFloatUniform(gl, program, "height", 480);
    // setFloatUniform(gl, program, "time", time * 0.005);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(() => loop(gl, program, video));
}

// function accessWebcam(video: HTMLVideoElement) {
//     return new Promise((resolve, reject) => {
//         const mediaConstraints = { audio: false, video: { width: 1280, height: 720, brightness: { ideal: 2 } } };
//         navigator.mediaDevices.getUserMedia(mediaConstraints).then(mediaStream => {
//             video.srcObject = mediaStream;
//             video.setAttribute('playsinline', "true");
//             video.onloadedmetadata = () => {
//                 video.play();
//                 resolve(video);
//             };
//         }).catch(err => {
//             reject(err);
//         });
//     });
// }

export async function setup(canvas: HTMLCanvasElement, video: HTMLVideoElement) {
    // const { gl } = glea;
    // try {
    //     await accessWebcam(video);
    // } catch (ex: any) {
    //     console.error(ex.message);
    // }

    // const [fontImage, lumImage] = await Promise.all([
    //     loadImage(fontURL),
    //     loadImage(luminanceMapURL)
    // ]);

    const { gl, program } = initWebGl(canvas, vert, frag);
    if (!gl || !program) {
        return;
    }

    const loc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(loc);

    const buffer = gl.createBuffer();
    const bufferData = new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, bufferData, WebGLRenderingContext.STATIC_DRAW);
    gl.vertexAttribPointer(loc, 2, WebGLRenderingContext.FLOAT, false, 0, 0);

    camTexture = createTexture(gl);

    console.log("video", video);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);

    // fontTexture = glea.createTexture(1);
    // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, fontImage);

    // lumTexture = glea.createTexture(2);
    // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, lumImage);

    // setActiveTexture(gl, 0, camTexture);

    // const loc = gl.getUniformLocation(program, "camTexture");
    // gl.uniform1i(loc, 0);

    setIntUniform(gl, program, "camTexture", 0);
    // glea.uniI('fontTexture', 1);
    // glea.uniI('lumTexture', 2);

    console.log("before loop");
    loop(gl, program, video);
}

