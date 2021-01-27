const canvas = document.getElementById("canvas1");
console.log(canvas);
//To use canvas
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// radius of the circle that draw the mouse
const edge = 30;

// To draw just we do click on the canvas
let drawing = false;
// position of the mouse
const mouse = {
  x: null,
  y: null,
};
// Coordinates of the position mouse's
window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  console.log(mouse.x + " , " + mouse.y);
});
// Class root to recreate each of the images replicated when the mouse in moving
class Root {
  constructor(x, y, color, centerX, centerY) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.speedX = 0;
    this.speedY = 0;
    this.centerX = centerX;
    this.centerY = centerY;
  }

  //Calculate position, speed and size of the circles
  draw() {
    // To draw circles randomly
    this.speedX += (Math.random() - 0.5) / 0.9;
    this.speedY += (Math.random() - 0.5 ) / 0.9;
    this.x += this.speedX;
    this.y += this.speedY;
    //Calculating the radius to draw all the circles in an area
    const distanceX = this.x - this.centerX;
    const distanceY = this.y - this.centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    //radius of each circle
    const radius = ((-distance / edge + 1) * edge) / 10;

    if (radius > 0) {
      requestAnimationFrame(this.draw.bind(this));
      ctx.beginPath();
      ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.strokeStyle = "black";
      ctx.stroke();
    }
  }
}

function branchOut(){
if(drawing === true){
 //Center would be the first time that the mouse appear
    const centerX = mouse.x;
    const centerY = mouse.y;
    for(let i = 0; i < 3; i++){
        const root = new Root(mouse.x, mouse.y, 'red', centerX, centerY);
        root.draw();
    }
}

   
}

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

//To desapear the circle slowly
window.addEventListener('mousemove', function(){
    // To create some kind of opacity in the draw
    // If we comment the next two lines of code the opacity 
    // is omitted and the draw is permanent
    // ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    branchOut();
})

// to draw when we do click on the canvas
window.addEventListener('mousedown', function(){
    drawing = true;
})

window.addEventListener('mouseup', function(){
    drawing = false;
})