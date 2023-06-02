export const setFloatVertexAttribPointer = (
    gl: WebGL2RenderingContext,
    location: number,
    itemLength: number,
    strideLength: number,
    offset: number
) => {
    gl.vertexAttribPointer(
        location,
        itemLength,
        WebGLRenderingContext.FLOAT,
        false,
        strideLength * Float32Array.BYTES_PER_ELEMENT,
        offset * Float32Array.BYTES_PER_ELEMENT
    );
};