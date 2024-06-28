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
uniform sampler2D uDisplacementTexture;

in float aIntensity;
in float aAngle;

void main() {
    vUv = uv;
    // DISPLACEMENT
    vec3 newPosition = position;
    float displacementIntensity = texture(uDisplacementTexture, uv).r;
    displacementIntensity = smoothstep(0.1, 0.3, displacementIntensity);

    vec3 displacement = vec3(
        cos(aAngle) * 0.2,
        sin(aAngle) * 0.2,
        1.0
    );
    displacement = normalize(displacement);
    displacement *= displacementIntensity;
    displacement *= 3.0;
    displacement *= aIntensity;
    newPosition +=displacement;

    // FINAL POSITION
    // vec4 modelPosition = modelViewMatrix * vec4(position, 1.0);
    // vec4 projectedPosition = projectionMatrix * viewPosition;
    vec4 viewPosition = modelViewMatrix * vec4(newPosition, 1.0);
    gl_Position = projectionMatrix * viewPosition;;

    // PICTURE
    float pictureIntensity = texture(uImageTexture, uv).r;

    // POINT SIZE
    gl_PointSize = 0.13 * pictureIntensity * uResolution.y;
    gl_PointSize *=(1.0 / - viewPosition.z);


    // Calc Color based on texture intensity
    vColor = vec3(pow(pictureIntensity, 2.0));



}