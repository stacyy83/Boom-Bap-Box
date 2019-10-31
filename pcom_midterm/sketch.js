/* Pcom Midterm */

var serial; // variable to hold an instance of the serialport library
var getPot1 = 0, getPot2 = 0, getPot3 = 0, getPot4 = 0,
    getSlide1 = 0, getSlide2 = 0,
    getBtn1 = 0,getBtn2 = 0,getBtn3 = 0,getBtn4 = 0, getBtn5 = 0,getBtn6 = 0,getBtn7 = 0,getBtn8 = 0, getBtn9 = 0,getBtn10 = 0,getBtn11 = 0,getBtn12 = 0; //variable to hold the data

var synth;
var players;
let playersReady = false;
let urls = {
    s1: './assets/sounds/one/EPnBass5.wav',
    s2: './assets/sounds/one/EPnBass6.wav',
    s3: './assets/sounds/one/EPnBass7.wav',
    s4: './assets/sounds/one/Galbanum22_09.wav',
    s5: './assets/sounds/one/Galbanum22_28.wav',
    s6: './assets/sounds/one/Galbanum22_31.wav',
    s7: './assets/sounds/two/CL60.wav',
    s8: './assets/sounds/two/Kick75.wav',
    s9: './assets/sounds/two/Kick86.wav',
    s10: './assets/sounds/two/OHHH.wav',
    s11: './assets/sounds/two/SFX24.wav',
    s12: './assets/sounds/two/TRPCLPSNRR.wav'
};

var btn1Status = false;
var btn2Status = false;
var btn3Status = false;
var btn4Status = false;
var btn5Status = false;
var btn6Status = false;
var btn7Status = false;
var btn8Status = false;
var btn9Status = false;
var btn10Status = false;
var btn11Status = false;
var btn12Status = false;

var vol;
var vol_;
var vol_map = 0;

var draw1 = 0, draw2 = 0, draw3 = 0, draw4 = 0, draw5 = 0, draw6 = 0, draw7 = 0, draw8 = 0, draw9 = 0, draw10 = 0, draw11 = 0, draw12 = 0;

var x, y, r, w, h;
var col = ['rgba(248,213,65,0.5)','rgba(31,207,180,0.5)','rgba(224,134,45,0.5)','rgba(234,109,133,0.5)'];

var x1,y1,x2,y2,mx,my,count,c;

var l,a,l2,a2;

var x_m, y_m, mx_m, my_m, count_m;

let r_wow, rx, ry, count_wow;

let w_w, h_w, count_w;

let colF = ['#f8d541','#1fcfb4','#e0862d','#ea6d85'];
let w_r, col_r, count_r;

let xoff, a_o, y_o, count_o;

let y_l, count_l;

let ballArray = [], count_b;

var bgIndex = 0, bg, bg_w, bg1, bg2;
var bgArray = [];
var pix_r = [];

let cam;

var aEffect1 = false,  aEffect2 = false,  aEffect3 = false, aEffect4 = false;



//=================================== Audio Effect ===========================================

  //Distortion
  var dist = new Tone.Distortion(1).toMaster();
  // players.connect(dist);

  //Delay*
  var feedbackDelay = new Tone.FeedbackDelay("8n", 0.5).toMaster();
  // players.connect(feedbackDelay);

  //Freeverb*
  var freeverb = new Tone.Freeverb().toMaster();
  // freeverb.dampening.value = 1000;
  // players.connect(freeverb);

  //JCReverb*
  var jcreverb = new Tone.JCReverb(0.4).connect(Tone.Master);
  // players.connect(jcreverb);

  //PingPongDelay*
  var pingPong = new Tone.PingPongDelay("4n", 0.2).toMaster();
  // players.connect(pingPong);


function preload(){
  //Tone.js
  synth = new Tone.Synth().toMaster();
  players = new Tone.Players(urls, () => {
      console.log("loaded");
      playersReady = true;
  }).toMaster();
  vol_ = vol_map;


  //bg
  bg = loadImage('./assets/img/bg/bg.png');
  bg_w = loadImage('./assets/img/bg/white.png');
  bg1 = loadImage('./assets/img/bg/bg1.jpg');
  bg2 = loadImage('./assets/img/bg/bg2.png');

  bgArray = [bg, bg_w, bg1, bg2];

  //image
  wow = loadImage('./assets/img/picture/popart2.png');
  man = loadImage('./assets/img/picture/Nas.png');
  woman = loadImage('./assets/img/picture/Missy.png');


}



function setup() {
  createCanvas(windowWidth, windowHeight);
  cam = createCapture(VIDEO);
  cam.hide();
  // cam.loadPixels();
  bg.loadPixels();
  pixelDensity(1);
  for (let i = 0; i < bg.pixels.length; i +=4) {
    pix_r[i] = bg.pixels[i];
    pix_r[i+1] = bg.pixels[i+1];
    pix_r[i+2] = bg.pixels[i+2];
  }
  
  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in	
  serial.list(); // list the serial ports
  serial.open("/dev/tty.usbmodem143301"); // open a port
  
}
// get the list of ports:
function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    print(i + " " + portList[i]);
  }
}

//=================================== serialEvent ==================================================
function serialEvent() {
  
  var stringFromSerial = serial.readLine();    // reads everything till the new line charecter
  if (stringFromSerial.length > 0) {             // is the something there ?
    var trimmedString = trim(stringFromSerial);  // get rid of all white space
    var myArray = split(trimmedString, ",")      // splits the string into an array on commas
    getPot1 = Number(myArray[0]); //A0            // get potentiometer1 value
    getPot2 = Number(myArray[1]); //A1
    getPot3 = Number(myArray[2]); //A2
    getPot4 = Number(myArray[3]); //A3

    getSlide1 = Number(myArray[4]); //A4
    getSlide2 = Number(myArray[5]); //A5

    getBtn1 = Number(myArray[6]); 	//D2		 
    getBtn2 = Number(myArray[7]);   //D3
    getBtn3 = Number(myArray[8]);   //D4
    getBtn4 = Number(myArray[9]);   //D5
    getBtn5 = Number(myArray[10]); 	//D6
    getBtn6 = Number(myArray[17]);  //D13

    getBtn7 = Number(myArray[11]);   //D7
    getBtn8 = Number(myArray[12]);   //D8
    getBtn9 = Number(myArray[13]);   //D9
    getBtn10 = Number(myArray[14]);   //D10		 
    getBtn11 = Number(myArray[15]);  //D11
    getBtn12 = Number(myArray[16]);  //D12
    
  }

  //============ Buttons ===============
  if(getBtn1 == 1){
    btn1Pressed();
  }else{
    btn1Status = false;
  }
  if(getBtn2 == 1){
    btn2Pressed();
  }else{
    btn2Status = false;
  }
  if(getBtn3 == 1){
    btn3Pressed();
  }else{
    btn3Status = false;
  }
  if(getBtn4 == 1){
    btn4Pressed();
  }else{
    btn4Status = false;
  }
  if(getBtn5 == 1){
    btn5Pressed();
  }else{
    btn5Status = false;
  }
  if(getBtn6 == 1){
    btn6Pressed();
  }else{
    btn6Status = false;
  }
  if(getBtn7 == 1){
    btn7Pressed();
  }else{
    btn7Status = false;
  }
  if(getBtn8 == 1){
    btn8Pressed();
  }else{
    btn8Status = false;
  }
  if(getBtn9 == 1){
    btn9Pressed();
  }else{
    btn9Status = false;
  }
  if(getBtn10 == 1){
    btn10Pressed();
  }else{
    btn10Status = false;
  }
  if(getBtn11 == 1){
    btn11Pressed();
  }else{
    btn11Status = false;
  }
  if(getBtn12 == 1){
    btn12Pressed();
  }else{
    btn12Status = false;
  }
  //============Slide Potentiometer ===============
  //Mapping Volume
  vol_map = map(getSlide1, 0, 255, -10, 5).toFixed(0);
  if(vol_map !== vol_){
    volumeChanged(vol_map);
  }

  //============ Potentiometer ===============
                                                          //Background Image
  if(getSlide2 < 510){
    bgIndex = 0;
  }else{
    bgIndex = 1;
  }
  // console.log('bgIndex:'+bgIndex);

//Delay Audio Effect
if(getPot1 > 512 && aEffect1 == false && aEffect2 == false && aEffect3 ==false && aEffect4 ==false){
  players.connect(feedbackDelay);
  aEffect1 = true;
  console.log("Audio Effect1 ON");
}else if(getPot1 < 512 && aEffect1 == true){
  players = new Tone.Players(urls, () => {
    console.log("loaded");
    playersReady = true;
}).toMaster();
  aEffect1 = false;
  console.log("Audio Effect1 OFF");
}
  

                                                          //FeedbackDelay Audio Effect
  if(getPot2 > 512 && aEffect1 == false && aEffect2 == false && aEffect3 ==false && aEffect4 ==false){
    players.connect(feedbackDelay);
    aEffect2 = true;
    console.log("Audio Effect2 ON");
  }else if(getPot2 < 512 && aEffect2 == true){
    players = new Tone.Players(urls, () => {
      console.log("loaded");
      playersReady = true;
  }).toMaster();
    aEffect2 = false;
    console.log("Audio Effect2 OFF");
  }
    
                                                          // Jcreverb Audio Effect
  if(getPot3 > 512 && aEffect1 == false && aEffect2 == false && aEffect3 ==false && aEffect4 ==false){
    players.connect(jcreverb);
    aEffect3 = true;
    console.log("Audio Effect3 ON");
  }else if(getPot3 < 512 && aEffect3 == true){
    players = new Tone.Players(urls, () => {
      console.log("loaded");
      playersReady = true;
  }).toMaster();
    aEffect3 = false;
    console.log("Audio Effect3 OFF");
  }
                                                          // PingPongDelay Audio Effect
   if(getPot4 > 512 && aEffect1 == false && aEffect2 == false && aEffect3 ==false && aEffect4 ==false){
    players.connect(pingPong);
    aEffect4 = true;
    console.log("Audio Effect3 ON");
  }else if(getPot4 < 512 && aEffect4 == true){
    players = new Tone.Players(urls, () => {
      console.log("loaded");
      playersReady = true;
  }).toMaster();
    aEffect4 = false;
    console.log("Audio Effect4 OFF");
  }
}

//=================================== Slide Potentiometer ===========================================
//Volume
function volumeChanged(volume){
  // vol = new Tone.Volume(volume);
  // players.chain(vol, Tone.Master);
  players.volume.value = volume;
  vol_ = vol_map;
  console.log("vol changed"+volume);
}

//=================================== Buttons ===========================================
//s1 sounds filter effect down
function btn1Pressed(){
  if(playersReady){
    if(getBtn1 == 1 && btn1Status == false){
      btn1Status = true;
      draw1 = 1;
      y = 0;
      h = 0;
      r = int(random(4));
      players.get('s1').start(); 
      console.log('s1');
    }
  }
}
//s2 sounds line effect
function btn2Pressed(){
  if(playersReady){
    if(getBtn2 == 1 && btn2Status == false){
      btn2Status = true;
      draw2 = 1;
      count = 0;
      x1 = random(-width, width);
      y1 = random(-height, height);
      mx = width-random(width-200);
      my = height - random(height-200);
      if(x1>0 && y1>0){
        x1 = width+random(20);
        y1 = height+random(20);
        mx = mx*(-1);
        my = my*(-1);
      }else if(x1>0 || y1<0){
        y1 = -10;
        if(x1>mx)
        mx = mx*(-1);
      }else if(x1<0 || y1>0){
        x1 = -10; 
        if(y1>my);
        my = my*(-1);
      }else{
        x1 = width-random(20);
        y1 = height-random(20);
      }

      x2 = x1 + mx;
      y2 = y1 + my;
      players.get('s2').start(); 
      console.log('s2');
    }
  }
}
//s3 sounds filter effect right
function btn3Pressed(){
  if(playersReady){
    if(getBtn3 == 1 && btn3Status == false){
      btn3Status = true;
      draw3 = 1;
      x = 0;
      w = 0; 
      r = int(random(4));
      players.get('s3').start(); 
      console.log('s3');
      
    }
  }
}
//s4 sounds rotate zoom out effect
function btn4Pressed(){
  if(playersReady){
    if(getBtn4 == 1 && btn4Status == false){
      btn4Status = true;
      draw4 = 1;
      l = 10;
      a = 0;
      c= 0;
      players.get('s4').start(); 
      console.log('s4');
    }
  }
}
//s5 sounds woman effect
function btn5Pressed(){
  if(playersReady){
    if(getBtn5 == 1 && btn5Status == false){
      btn5Status = true;
      draw5 = 1;
      w_w = 200;
      h_w = 200;
      count_w = 0;
      players.get('s5').start(); 
      console.log('s5');
    }
  }
}
//s6 sounds rotate zoom in effect
function btn6Pressed(){
  if(playersReady){
    if(getBtn6 == 1 && btn6Status == false){
      btn6Status = true;
      draw6 = 1;
      l2 = width;
      a2 = 0;
      // c = 0;
      players.get('s6').start(); 
      console.log('s6');
    }
  }
}
//s7 sounds rect effect
function btn7Pressed(){
  if(playersReady){
    if(getBtn7 == 1 && btn7Status == false){
      btn7Status = true;
      draw7 = 1;
      w_r = random(50,100);
      xr = random(width-100);
      col_r = int(random(4));
      count_r = 0;
      players.get('s7').start(); 
      console.log('s7');
    }
  }
}
//s8 sounds line2 effect
function btn8Pressed(){
  if(playersReady){
    if(getBtn8 == 1 && btn8Status == false){
      btn8Status = true;
      draw8 = 1;
      y_l = random(height);
      count_l = 0;
      players.get('s8').start(); 
      console.log('s8');
    }
  }
}
//s9 sounds
function btn9Pressed(){
  if(playersReady){
    if(getBtn9 == 1 && btn9Status == false){
      btn9Status = true;
      draw9 = 1;
      xoff = 0.0;
      a_o = 0;
      y_o = 0;
      count_o = 0;
      players.get('s9').start(); 
      console.log('s9');
    }
  }
}
//s10 sounds img fly effect
function btn10Pressed(){
  if(playersReady){
    if(getBtn10 == 1 && btn10Status == false){
      btn10Status = true;
      draw10 = 1;

      count_m = 0;
      x_m = random(-width, width);
      y_m = random(-height, height);
      mx_m = width-random(width-200);
      my_m = height - random(height-200);
      
      if(x_m>0 && y_m>0){
        x_m = width+random(20);
        y_m = height+random(20);
        mx_m = mx_m*(-1);
        my_m = my_m*(-1);
      }else if(x_m>0 || y_m<0){
        y_m = -10;
        if(x_m>mx_m)
        mx_m = mx_m*(-1);
      }else if(x_m<0 || y_m>0){
        x_m = -10; 
        if(y_m>my_m);
        my_m = my_m*(-1);
      }else{
        x_m = width-random(20);
        y_m = height-random(20);
      }
      players.get('s10').start(); 
      console.log('s10');
    }
  }
}
//s11 sounds wow effect
function btn11Pressed(){
  if(playersReady){
    if(getBtn11 == 1 && btn11Status == false){
      btn11Status = true;
      draw11 = 1;
      r_wow = 0;
      count_wow = 0;
      rx = random(200, width-200);
      ry = random(200, height-200);
          players.get('s11').start(); 
          console.log('s11');
    }
  }
}
//s12 sounds
function btn12Pressed(){
  if(playersReady){
    if(getBtn12 == 1 && btn12Status == false){
      btn12Status = true;
      draw12 = 1;
      count_b =0;
      for(var i=0; i<10; i++){
        let x = random(width);
        let y = random(height);
        
        let newball = new Ball(x, y, random(20,50), color);
        ballArray.push(newball);
      }
      // for(var i=0; i< ballArray.length; i++){
      //   ballArray[i].clear();
      // }
      players.get('s12').start(); 
      console.log('s12');
    }
  }
}

//=================================== Visual Effect ===========================================
                                                    //Filter Effect
function filterEffect(){
  noStroke();
  fill(col[r]);
  rect(0, y, width , h);
  if(h <= height){
      h = h+30; 
  }else{
      h = height+1;
  }
  if(h> height){
      y = y+30;
  }
  //End animation
  if(y>height){
      draw1 = 0;
  }
}
                                                      //Line Effect
function lineEffect(){
  stroke(0);
  strokeWeight(8);
  line(x1, y1, x2, y2);
  x1 = x1 + mx / 30;
  y1 = y1 + my / 30;
  x2 = x2 + mx / 30;
  y2 = y2 + my / 30;
  count ++;
  if(count>100){
    draw2 = 0;
  }
}
function line2Effect(){
  strokeWeight(8);
  stroke(255);
  line(0,y_l,width,y_l);
  if(count_l>20)
  draw8 = 0;
  count_l++;
}
function manEffect(){
  x_m = x_m + mx_m / 30;
  y_m = y_m + my_m / 30;
  count_m ++;
  image(man, x_m, y_m, 200,200);
  if(count_m>80){
    draw10 = 0;
    count_m = 0;
  }
}
function noiseEffect(){
  if(count_o< 30){
    noFill();
    // stroke(204,255,238);
    stroke(0);
    strokeWeight(5);
    beginShape();  
    for(let x = 0; x < width; x++){
      y_o = map(noise(xoff), 0, 1, -50,50);
      vertex(x,200+y_o);   
      xoff += 0.03;
     
    } 
    endShape();
  }else{
    draw9 = 0;
  }
  count_o++;
  
}
function ballEffect(){
  for(var i=0; i< ballArray.length; i++){
    ballArray[i].display();
  }
  count_b++;
  if(count_b > 20){
    for(var i=0; i< ballArray.length; i++){
      ballArray[i].clear();
    }
    draw12 = 0;
    count_b = 0;
  }
}
function picZoomEffect(){
  w_w++;
  h_w++;
  translate(width/2, height/2);
  image(woman, -w_w/2, -h_w/2, w_w, h_w);
  count_w++;
  if(count_w> 10){
    image(woman,-width,-height,w_w,h_w);
    draw5 = 0;
    count_w = 0;
  }
}
                                                        //Filter Effect Right
function filterEffectRight(){
  noStroke();
  fill(col[r]);
  rect(x, 0, w , height);
  
  if(w <= width){
    w = w+30; 
  }else{
    w = width+1;
  }
  
  if(w> width){
    x = x+30;
  }
  //End animation
  if(x>width){
    draw3 = 0;
  }
  
}
function rectEffect(){
  if(count_r<20){
    strokeWeight(10);
    stroke(0);
    fill(colF[col_r]);
    rect(xr,0,w_r,height);
  }else{
    draw7 = 0;
    count_r = 0;
  }
  count_r++;
  
}
function wowEffect(){
  if(count_wow % 20 > 10){
    r_wow = -0.1; 
  }else{
    r_wow = 0;
  }
  translate(rx, ry);
  rotate(r_wow);

  if(count_wow> 30){
    image(wow,-width,-height,200,200);
    draw11 = 0;
  }
  image(wow, -200/2, -200/2, 200, 200);
  count_wow++;
  console.log(count_wow);
}
                                                        //Rotate Effect
function rotateEffectOut(){
  // let size = 100;
  translate(width/2, height/2);
  rotate(a);
  noFill();
  strokeWeight(5);
  stroke(0);
  beginShape();
  vertex(0, l);
  vertex(l, 0);
  vertex(0, -l);
  vertex(-l, 0);
  endShape(CLOSE);
  if(l< width){
    l+=100;
    // l= (l+size)%size;
    a+=1;
    console.log(width);
  }else{
    // l = width;
    console.log('end');
    if(draw4 == 1)
    draw4 = 0;
  }
}
function rotateEffectIn(){
  // let size = 100;
  translate(width/2, height/2);
  rotate(a2);
  noFill();
  strokeWeight(5);
  stroke(255);
  beginShape();
  vertex(0, l2);
  vertex(l2, 0);
  vertex(0, -l2);
  vertex(-l2, 0);
  endShape(CLOSE);
  if(l2>0){
    l2-=100;
    // l= (l+size)%size;
    a2-=1;
    console.log(width);
  }else{
    // l = width;
    console.log('end');
    if(draw6 == 1)
    draw6 = 0;
  }
}

//=================================== Draw ===========================================
function draw() {
  // fullscreen();
  // background(255);
  if(bgIndex == 0){
    image(bg, 0, 0);
    for (let i = 0; i < bg.pixels.length; i +=4) {
      if(aEffect1 == true){
        bg.pixels[i] += 100;
      }else if(aEffect2 == true){
        bg.pixels[i+1] -= 100;
      }else if(aEffect3 == true){
        bg.pixels[i+2] += 100;
      }else if(aEffect4 == true){
        bg.pixels[i] -= 100;
      }else if(aEffect1 == false && aEffect2 == false && aEffect3 == false && aEffect4 == false){
        bg.pixels[i] = pix_r[i];
        bg.pixels[i+1] = pix_r[i+1];
        bg.pixels[i+2] = pix_r[i+2];
      }
      
    }
    bg.updatePixels();
  }else{
    image(cam, 0, 0, width, height);
    if(aEffect1 == true){
      filter(INVERT);
    }else if(aEffect2 == true){
      filter(GRAY);
    }else if(aEffect3 == true){
      filter(THRESHOLD);
    }else if(aEffect4 == true){
      filter(ERODE);
    }
  }
  
  
  if(draw1 == 1){
    filterEffect();
    console.log('Filter Effect');
  }
  if(draw2 == 1){
    lineEffect();
    console.log('Line Effect');
  }
  if(draw3 == 1){
    filterEffectRight();
    console.log('Filter Effect Right');
  }
  if(draw4 ==1){
    rotateEffectOut(1,50);
    console.log('Rotate Out');
  }
  if(draw5 ==1){
    picZoomEffect();
    console.log('Pic Zoom Effect');
  }
  if(draw6 ==1){
    rotateEffectIn();
    console.log('Rotate In');
  }
  if(draw7 ==1){
    rectEffect();
    console.log('Rect Effect');
  }
  if(draw8 ==1){
    line2Effect();
    console.log('Line2 Effect');
  }
  if(draw9 ==1){
    noiseEffect();
    console.log('Noise');
  }
  if(draw10 == 1){
    manEffect();
    console.log('Man');
  }
  if(draw11 ==1){
    wowEffect();
    console.log('WOW');
  }
  if(draw12 ==1){
    ballEffect();
    console.log('Balls');
  }
  
  
  
  
}

/*Arduino code
void setup() {
  Serial.begin(9600);
  pinMode(2,INPUT);
  pinMode(3,INPUT);
  pinMode(4,INPUT);
  pinMode(5,INPUT);
  pinMode(6,INPUT);
  pinMode(7,INPUT);
  pinMode(8,INPUT);
  pinMode(9,INPUT);
  pinMode(10,INPUT);
  pinMode(11,INPUT);
  pinMode(12,INPUT);
  pinMode(13,INPUT);
}
void loop() {
  int valueToSend = analogRead(A0);
  Serial.print(valueToSend);
  Serial.print(",");
  valueToSend = analogRead(A1);
  Serial.print(valueToSend);
  Serial.print(",");
  valueToSend = analogRead(A2);
  Serial.print(valueToSend);
  Serial.print(",");
  valueToSend = analogRead(A3);
  Serial.print(valueToSend);
  Serial.print(",");
  valueToSend = analogRead(A4)/4;
  Serial.print(valueToSend);
  Serial.print(",");
  valueToSend = analogRead(A5);
  Serial.print(valueToSend);
  Serial.print(",");
  valueToSend = digitalRead(2);
  Serial.print(valueToSend);
  Serial.print(",");
  valueToSend = digitalRead(3);
  Serial.print(valueToSend);
  Serial.print(",");
  valueToSend = digitalRead(4);
  Serial.print(valueToSend);
  Serial.print(",");
  valueToSend = digitalRead(5);
  Serial.print(valueToSend);
  Serial.print(",");
  valueToSend = digitalRead(6);
  Serial.print(valueToSend);
  Serial.print(",");
  valueToSend = digitalRead(7);
  Serial.print(valueToSend);
  Serial.print(",");
  valueToSend = digitalRead(8);
  Serial.print(valueToSend);
  Serial.print(",");
  valueToSend = digitalRead(9);
  Serial.print(valueToSend);
  Serial.print(",");
  valueToSend = digitalRead(10);
  Serial.print(valueToSend);
  Serial.print(",");
  valueToSend = digitalRead(11);
  Serial.print(valueToSend);
  Serial.print(",");
  valueToSend = digitalRead(12);
  Serial.print(valueToSend);
  Serial.print(",");
  valueToSend = digitalRead(13);
  Serial.println(valueToSend);

  delay (100);
}
*/

