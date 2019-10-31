var count=0;
class Ball{
  constructor(x,y,size,color){
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = random(['#f8d541','#1fcfb4','#e0862d','#ea6d85']);
  }
  
  display(){
      noStroke();
      ellipse(this.x, this.y, this.size, this.size);
      fill(this.color);
    if(count<50){
      this.size+=10;
    }else if(count > 50){
      this.size = this.size;
    }
    count++;
    
  }
  clear(){
      this.size = 0;
      count = 0;
  }
  
}