p5.disableFriendlyErrors = true;

// speed of the wobble
let speed = 1;

// tiling of the wobble
let tiling = 5;

// strength of the wobble
let strength = 2;

// the shader
let sh;

// an image
let img;

let vert = 'attribute vec4 aPosition;'+
'varying vec4 v_uv;'+
'void main() {'+
'v_uv = aPosition;'+
'v_uv.y *= -1.0;'+
'v_uv.x = v_uv.x * 0.5 + 0.5;'+
'v_uv.y = v_uv.y * 0.5 + 0.5;'+ 
    'gl_Position = aPosition;'+
'}';

let frag = 'precision mediump float;'+

'uniform sampler2D uSampler;'+
'uniform float u_time;'+

'uniform float u_speed;'+
'uniform float u_tiling;'+
'uniform float u_strength;'+

'varying vec4 v_uv;'+

'void main() {'+
'vec2 texcoord = vec2(v_uv.x-sin(u_time*u_speed)*0.05*cos(v_uv.y*u_tiling)*u_strength, v_uv.y-cos(u_time*u_speed)*0.05*sin(v_uv.x*u_tiling)*u_strength);'+
'vec4 col = texture2D(uSampler, texcoord);'+
'gl_FragColor = col;'+
'}'

function preload() {
    // load the image
    //img = loadImage('http://127.0.0.1:8887/ah-blur-smallsquare.png');
	  img = loadImage('assets/ah-blur-smallsquare.png');    // image rightside up
}

function setup() {
    createCanvas(200, 200, WEBGL);
    sh = createShader(vert, frag);
		background(0);
}

function draw() {
    // set uniforms
    sh.setUniform("uSampler", img);
    sh.setUniform("u_time", millis()/20000);
    sh.setUniform("u_speed", speed);
    sh.setUniform("u_tiling", tiling+mouseY*0.01);
    sh.setUniform("u_strength", strength+mouseX*0.01);
    
    // render on a quad
    shader(sh);
		rotateZ(frameCount);
	  //box(width*2);
		//scale(-1, -1);
    quad(-1, -1, 1, -1, 1, 1, -1, 1);
}
