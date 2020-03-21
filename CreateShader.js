


var vs = `
varying vec2 vUv;

void main() {

  vUv = uv;

  gl_Position = vec4( position, 1.0 );

}

`


var shaderCode = {

  leftGradient:` 
    varying vec2 vUv;
    void main() {
      gl_FragColor = vec4(vUv.x,vUv.x,vUv.x,1.);
    }`,

  smooth:` 
    varying vec2 vUv;
    void main() {
      gl_FragColor = vec4(vUv.x,vUv.x,vUv.x,1.);
    }`,

  choppy:` 
    varying vec2 vUv;
    void main() {

      float v = vUv.x * 10.;
      v = mod(v ,1.);
      gl_FragColor = vec4(v,v,v,1.);
    }`,

  random:` 
    varying vec2 vUv;

    float hash( vec2 p ){
      float h = dot(p,vec2(127.1,311.7));
      return -1.0 + 2.0*fract(sin(h)*43758.5453123);
    }

    void main() {

      float v = hash(vec2(vUv.x));//mod(v ,1.);
      gl_FragColor = vec4(v,v,v,1.);
    }`,


  sinCurves:` 
  varying vec2 vUv;
  void main() {
    float r = sin( vUv.x * 20.  + .2*sin( vUv.y * 20.)) * .5 + .5;
    float g = sin( vUv.x * 22.  + .2*sin( vUv.y * 20.))* .5 + .5;
    float b = sin( vUv.x * 24.  + .2*sin( vUv.y * 20.))* .5 + .5;
    gl_FragColor = vec4(r,g,b,1.);
  }`,

  sinCurves2:` 
  varying vec2 vUv;
  void main() {
    float r = sin( vUv.x * 100.  + sin( vUv.y * 20.)) * .5 + .5;
    float g = sin( vUv.y * 4.  + sin( vUv.x * 20.))* .5 + .5;
    float b = sin( vUv.x * 10.  + sin( vUv.y * 20.))* .5 + .5;

    float bw = length(vec3(r,g,b));
    bw = bw * bw * bw;
    gl_FragColor = vec4(bw,bw,bw,1.);
  }`,



}

/*
  TODO make it so you can click to see the shader code
*/
function ShowShaderCode(){

}

var shaders = [];


var uniforms = {
  "time": { value: 1.0 }
};

function CreateShader(name,width,height,dynamic){


    container = document.createElement( 'container' );
    container.className = 'shader';
    container.style.width = width + "%"
    container.style.height = height + "%"
    container.dynamic = dynamic;

    container.code = shaderCode[name];
    container.onclick = ShowShaderCode( container.code );

    console.log( container.offsetWidth );

    document.body.appendChild( container );

        var camera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );

        var scene = new THREE.Scene();

        var geometry = new THREE.PlaneBufferGeometry( 2, 2 );

    

        var material = new THREE.ShaderMaterial( {

          uniforms: uniforms,
          vertexShader: vs,
          fragmentShader: container.code

        } );

        var mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );
console.log( $( container ).width() ) ;
        var renderer = new THREE.WebGLRenderer();
        console.log( container );
        renderer.setSize( $( container ).width(), $( container ).width()  * height/100 );
        renderer.setPixelRatio( window.devicePixelRatio );
        container.appendChild( renderer.domElement );

      container.renderer = renderer;

      container.renderScene = function(){ renderer.render(scene, camera); }
      container.renderScene();

      shaders.push( container );

      return container;


  
}