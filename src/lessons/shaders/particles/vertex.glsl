precision highp float;

// glsl3 use in instead of attribute for vertex shader inputs
in vec3 position;
in vec2 uv;

// use 'in' or 'out' instead of varying
// use 'out' to pass data to the fragment shader
out vec2 vUv;
out vec3 vColor;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform vec2 uResolution;
uniform sampler2D uImageTexture;

void main() {
    vUv = uv;

    // FINAL POSITION
    // vec4 modelPosition = modelViewMatrix * vec4(position, 1.0);
    // vec4 projectedPosition = projectionMatrix * viewPosition;
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * viewPosition;;

    // PICTURE
    float pictureIntensity = texture(uImageTexture, uv).r;

    // POINT SIZE
    gl_PointSize = 0.13 * pictureIntensity * uResolution.y;
    gl_PointSize *=(1.0 / - viewPosition.z);


    // Calc Color based on texture intensity
    vColor = vec3(pow(pictureIntensity, 2.0));



}