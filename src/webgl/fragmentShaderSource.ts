export const fragmentShaderSource = `#version 300 es
    #pragma vscode_glsllint_stage: vert

    precision mediump float;

    out vec4 fragColor;
    
    void main() {
        fragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
`;