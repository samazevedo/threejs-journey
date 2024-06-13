precision highp float;
uniform sampler2D uTexture;
in vec2 vUv;
out vec4 FragColor;

void main() {
    FragColor = texture(uTexture, vUv);
}