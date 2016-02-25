var React = require('react-native');
var GL = require('gl-react-native');

const shaders = GL.Shaders.create({
  //helloGL: {
  //  frag: `
//precision highp float;
//varying vec2 uv;
//void main () {
//  gl_FragColor = vec4(uv.x, uv.y, 0.5, 1.0);
//}`
//  },

  color: {
    frag: `
precision lowp float;

void main() {
	gl_FragColor.r = 0.5;
	gl_FragColor.g = 1.0;
	gl_FragColor.b = 0.5;
	gl_FragColor.a = 0.5;
}`
  },
  //pointer: {
  //  frag: `
//precision mediump float;
//
//uniform vec2 mouse;
//uniform vec2 resolution;
//
//void main( void ) {
//	vec2 mouse_distance = mouse - (gl_FragCoord.xy / resolution);
//	float red = 1.0 - length(mouse_distance);
//	gl_FragColor = vec4(red, 0, 0, 1.0);
//}`
  //}
});

class ShaderDemo extends GL.Component {
  render () {
    const { width, height, shader } = this.props;
    return (
      <GL.View
        shader={shaders[shader]}
        width={width}
        height={height}
      />
    );
  }
}

module.exports = ShaderDemo;