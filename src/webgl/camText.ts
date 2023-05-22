const glsl = (x: any) => x;

const frag = glsl`
    precision highp float;

    uniform float width;
    uniform float height;
    uniform float time;

    uniform sampler2D camTexture;
    uniform sampler2D fontTexture;
    uniform sampler2D lumTexture;

    const int useSobel = 0;
    const int zoom = 1;

    // normalize coords and correct for aspect ratio
    vec2 normalizeScreenCoords()
    {
      float aspectRatio = width / height;
      vec2 result = 2.0 * (gl_FragCoord.xy / vec2(width, height) - 0.5);
      result.x *= aspectRatio;
      return result;
    }
    
    float deform(vec2 p, float factor) {
      return sin(time * .1 + factor * p.x) * cos(time * .1 + factor * p.y);
    }
    
    vec4 invert(vec4 color) {
      return vec4(1.0 - color.rgb, 1.0);
    }
    
    vec4 grey(vec4 color) {
      // float val = (color.x + color.y + color.z) / 3.0;
      float val = 0.3 * color.x + 0.59 * color.y + 0.11 * color.z;
      return vec4(vec3(val), 1.0);
    }
    
    vec2 getTexCoords(vec2 position) {
      return 1.0 - position.xy / vec2(width, height);
    }
    
    float luminance(vec3 color) {
      return 0.2126*color.x + 0.7152*color.y + 0.0722*color.z;
    }
    
    // 2D Random
    float random (in vec2 st) {
        return fract(sin(dot(st.xy,
                             vec2(12.9898,78.233)))
                     * 43758.5453123);
    }
    
    vec2 camCoord(vec2 coord) {
      return 1.0 - coord / vec2(width, height);
    } 
    
    
    vec4 sobel(in sampler2D tex, in vec2 coord) {
      float w = 1.0 / width;
      float h = 1.0 / height;
      vec4 n0 = texture2D(tex, coord + vec2(-w, -h));
      vec4 n1 = texture2D(tex, coord + vec2( 0, -h));
      vec4 n2 = texture2D(tex, coord + vec2( w, -h));
      vec4 n3 = texture2D(tex, coord + vec2(-w,  0));
      vec4 n4 = texture2D(tex, coord);
      vec4 n5 = texture2D(tex, coord + vec2( w, 0));
      vec4 n6 = texture2D(tex, coord + vec2(-w, h));
      vec4 n7 = texture2D(tex, coord + vec2( 0, h));
      vec4 n8 = texture2D(tex, coord + vec2( w, h));
      vec4 edgeH = n2 + (2.0 * n5) + n8 - (n0 + (2.0 * n3) + n6);
      vec4 edgeV = n0 + (2.0 * n1) + n2 - (n6 + (2.0 * n7) + n8);
      vec4 sobel = sqrt((edgeH * edgeH) + (edgeV * edgeV));
      return sobel;
    }
    
    vec2 getFontCoord(int i) {
      float chY = floor(float(i) / 16.);
      float chX = mod(float(i), 16.);
      vec2 fontCoord = vec2((chX * 8. + mod(gl_FragCoord.x / float(zoom), 8.)) / 128., (chY * 8. + (8. - mod(gl_FragCoord.y / float(zoom), 8.))) / 128.);
      return fontCoord;
    }
    
    vec2 getLumCoord(in int i, in vec2 p) {
      float chY = floor(float(i) / 16.);
      float chX = mod(float(i), 16.);
      vec2 lumCoord = vec2((chX * 2. + p.x) / 32., (chY * 2. + 2. - p.y) / 32.);
      return lumCoord;
    }
    
    
    vec4 averageBlockColor() {
      vec2 a = floor(gl_FragCoord.xy / (float(zoom) * 8.)) * float(zoom) * 8.;
      vec2 b = a + vec2(4, 0) * float(zoom);
      vec2 c = b + vec2(0, 4) * float(zoom);
      vec2 d = c + vec2(4, 4) * float(zoom);
      vec4 c0 = useSobel == 1 ? grey(sobel(camTexture, camCoord(a))) : grey(texture2D(camTexture, camCoord(a)));
      vec4 c1 = useSobel == 1 ? grey(sobel(camTexture, camCoord(b))) : grey(texture2D(camTexture, camCoord(b)));
      vec4 c2 = useSobel == 1 ? grey(sobel(camTexture, camCoord(c))) : grey(texture2D(camTexture, camCoord(c)));
      vec4 c3 = useSobel == 1 ? grey(sobel(camTexture, camCoord(d))) : grey(texture2D(camTexture, camCoord(d)));
    
      float minDist = 9999.;
      int minIdx = 32;
      for (int i = 32; i < 127; i++) {
        int chY = 16 - i / 16;
        int chX = int(mod(float(i), 16.));
        vec4 l0 = texture2D(lumTexture, getLumCoord(i, vec2(0. ,0.)));
        vec4 l1 = texture2D(lumTexture, getLumCoord(i, vec2(1. ,0.)));
        vec4 l2 = texture2D(lumTexture, getLumCoord(i, vec2(0. ,1.)));
        vec4 l3 = texture2D(lumTexture, getLumCoord(i, vec2(1. ,1.)));
        float dist = length(vec4(
          c0.x - l0.x,
          c1.x - l1.x,
          c2.x - l2.x,
          c3.x - l3.x
        ));
        if (dist < minDist) {
          minIdx = i;
          minDist = dist;
        }
      }
      // minIdx = 64;
      vec2 p = mod(gl_FragCoord.xy / 2.0, 8.);
      // float cY = floor(16. - float(minIdx) / 16.);
      // float cX = mod(float(minIdx), 16.);
      vec2 fontCoord = getFontCoord(minIdx);
      return texture2D(fontTexture, fontCoord);
  
  
      // return c0;
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
    precision mediump float;
    attribute vec2 position;

    void main () {
        gl_Position = vec4(position, 0, 1.0);
    }
`;

let camTexture: any = null;
let fontTexture: any = null;
let lumTexture: any = null;

const glea = new GLea({
    glOptions: {
        preserveDrawingBuffer: true
    },
    shaders: [
        GLea.fragmentShader(frag),
        GLea.vertexShader(vert)
    ],
    buffers: {
        'position': GLea.buffer(2, [1, 1, -1, 1, 1, -1, -1, -1])
    }
}).create();

window.addEventListener('resize', () => {
    glea.resize();
});

function loop(video: HTMLVideoElement, time: number) {
    const { gl } = glea;
    // Upload the image into the texture.
    if (video) {
        glea.setActiveTexture(0, camTexture);
        gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, video);
    }

    glea.clear();
    glea.uni('width', glea.width);
    glea.uni('height', glea.height);
    glea.uni('time', time * .005);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame((newTime) => loop(video, newTime));
}

function accessWebcam(video: HTMLVideoElement) {
    return new Promise((resolve, reject) => {
        const mediaConstraints = { audio: false, video: { width: 1280, height: 720, brightness: { ideal: 2 } } };
        navigator.mediaDevices.getUserMedia(mediaConstraints).then(mediaStream => {
            video.srcObject = mediaStream;
            video.setAttribute('playsinline', "true");
            video.onloadedmetadata = () => {
                video.play();
                resolve(video);
            };
        }).catch(err => {
            reject(err);
        });
    });
}

export async function setup(video: HTMLVideoElement) {
    const { gl } = glea;
    try {
        await accessWebcam(video);
    } catch (ex: any) {
        console.error(ex.message);
    }

    // const [fontImage, lumImage] = await Promise.all([
    //     loadImage(fontURL),
    //     loadImage(luminanceMapURL)
    // ]);

    camTexture = glea.createTexture(0);
    // Upload the image into the texture.
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);

    // fontTexture = glea.createTexture(1);
    // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, fontImage);

    // lumTexture = glea.createTexture(2);
    // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, lumImage);

    glea.setActiveTexture(0, camTexture);

    glea.uniI('camTexture', 0);
    // glea.uniI('fontTexture', 1);
    // glea.uniI('lumTexture', 2);
    loop(video, 0);
}

