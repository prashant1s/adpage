declare module 'ogl' {
  export class Renderer {
    constructor(options?: { dpr?: number; alpha?: boolean; antialias?: boolean });
    gl: WebGLRenderingContext & {
      canvas: HTMLCanvasElement & { style: CSSStyleDeclaration };
      drawingBufferWidth: number;
      drawingBufferHeight: number;
      DEPTH_TEST: number;
      CULL_FACE: number;
      BLEND: number;
      disable(cap: number): void;
    };
    setSize(width: number, height: number): void;
    render(options: { scene: Mesh }): void;
  }

  export class Triangle {
    constructor(gl: any);
  }

  export class Program {
    uniforms: Record<string, { value: any }>;
    constructor(gl: any, options: { vertex: string; fragment: string; uniforms: Record<string, { value: any }> });
  }

  export class Mesh {
    constructor(gl: any, options: { geometry: Triangle; program: Program });
  }
}
