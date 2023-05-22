export const vertexShaderSource = `#version 300 es
    #pragma vscode_glsllint_stage: vert
    
    in vec2 aPosition;
    in float aPointSize;

    void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
        gl_PointSize = aPointSize;
    }
`;