precision highp float;

in vec2 vUv; // UV coordinates
in vec3 vColor;

out vec4 fragColor;

void main(){
    vec2 uv = gl_PointCoord;

    // float distanceToCenter = distance(uv, vec2(0.5));
    float distanceToCenter = length(uv - vec2(0.5));

    // discard pixels outside the central circular area of the point sprite
    if(distanceToCenter > 0.5) discard;



    // fragColor = vec4(vec3(distanceToCenter),1.0);
    fragColor = vec4(vColor,1.0);
    // #include <tonemapping_fragment>
    // #include <colorspace_fragment>



}