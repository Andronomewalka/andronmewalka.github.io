export const vertexShaderSource = `#version 300 es
    #pragma vscode_glsllint_stage: vert
    
    void main() {
        gl_Position = vec4(0.0, 0.0, 0.0, 0.1);
        gl_PointSize = 150.0;
    }
`;