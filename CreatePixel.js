
  function AddSlider( name , pixel , size ){

    var holder   = document.createElement('div');  
    var slider     = document.createElement('input');  
    var val = document.createElement('div');
    pixel.appendChild( holder );
    holder.appendChild( slider );
    holder.appendChild(val);



  holder.className = 'range';
  val.className = 'slider-value'
  val.innerHTML = ".5";
  val.style.pointerEvents = 'none';
  val.style.fontSize = size * .1 + "px"
  val.style.marginTop = -size * .1 + "px"
  slider.min = 0;  slider.max = 255; slider.value = 128; slider.type = 'range';
  slider.className = 'slider';
  slider.pixel = pixel;
  slider.GetValue = function(){
    return (this.value / 255);
  }
  slider.holder = holder;
  slider.oninput = function(){
    var v = Math.floor( this.GetValue() * 100 ) /100
    val.innerHTML = name + " : " + v;
    this.pixel.update();
  }


  pixel[name] = slider;
  
}
function CreatePixel(size){
  
  var fullPixel = document.createElement('div');
  fullPixel.className = 'pixel'
  fullPixel.style.width = size + "px"
  fullPixel.style.height = size + "px"

  fullPixel.style.background = "rgba("





  document.body.appendChild(fullPixel);

  var s = $( fullPixel ).width()
  
  console.log("SSS :  " + s );

  AddSlider("R",fullPixel,s);
  AddSlider("G",fullPixel,s);
  AddSlider("B",fullPixel,s);

  fullPixel.update = function(){
    this.style.background = "rgba("+this.R.value + "," + this.G.value + "," +this.B.value + ",1)";
  }

  fullPixel.SetValues = function( r,g,b){

    this.R.value = r * 255;
    this.G.value = g * 255;
    this.B.value = b * 255;

    this.R.oninput();
    this.G.oninput();
    this.B.oninput();

  }

  fullPixel.HideValues = function(){
    this.R.holder.style.display="none";
    this.G.holder.style.display="none";
    this.B.holder.style.display="none";
  }

  return fullPixel;
  
  
}

function CreateAxis(){

}


function Set3x3( colors ){

  for( var i = 0; i < this.length; i++ ){
    this[i].SetValues(colors[i][0],colors[i][1],colors[i][2]);
  }
}

function Hide3x3( colors ){

  for( var i = 0; i < this.length; i++ ){
    this[i].HideValues();
  }
}


function Create3x3(){
  var pixels = []
  pixels.push( CreatePixel(100));
  pixels.push( CreatePixel(100));
  pixels.push( CreatePixel(100));
  document.body.appendChild( document.createElement('p'));
  pixels.push( CreatePixel(100));
  pixels.push( CreatePixel(100));
  pixels.push( CreatePixel(100));
  document.body.appendChild( document.createElement('p'));
  pixels.push( CreatePixel(100));
  pixels.push( CreatePixel(100));
  pixels.push( CreatePixel(100));
  CreateAxis();
  pixels.SetColors = Set3x3;
  pixels.HideValues = Hide3x3;

  return pixels;
}