precision highp float;

// Input from vertex shader
in vec2 vUv;

// Output color
out vec4 outColor;

// Uniforms
uniform float time;
// uniform vec2 vUv;
// add texture
uniform sampler2D textureSampler;

void main() {
    // vec3 color = vec3(0.37, 0.51, 0.84);
    // outColor = vec4(color , 1.0);

    vec4 texColor = texture(textureSampler, vUv);
    outColor = texColor;

    
}