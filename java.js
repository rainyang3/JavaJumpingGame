//NOTES to guide as I am going through the tutorial and Troubleshooting//
//Canvas Setup
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

//get mouse position

let mouse = {
    x: null, 
    y: null,
    radius: (canvas.height/100) * (canvas.width/100)
}

//updating mouse positon x and y

window.addEventListener('mousemove',
    function(event) {
      mouse.x = event.x;
      mouse.y = event.y;
    }
);
//create particle

class Particle {
        constructor(x,y,directionX,directionY,size,color) {
          this.x = x;
          this.y = y;
          this.directionX = directionX;
          this.directionY = directionY;
          this.size = size;
          this.color = color;
        }

        // drawing an individual particle
        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
          ctx.fillStyle = '#fff5eb';
          ctx.fill();
        }

        //1.checking particle position, checking mouse position, moving the particle, and drawing the particle.

        update() {
        //checking if particle is still within the canvas area.
          if (this.x > canvas.width || this.x < 0) {
              this.directionX = -this.directionX;
          } 
          if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
          }


          //checking and detecting collision - mouse position vs. particle position.

          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx*dx + dy*dy);
          if (distance < mouse.radius + this.size){
              if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 10;
              }
              if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
              }
              if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10;
              }
              if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
              }
          }

          //moving particle

          this.x += this.directionX;
          this.y += this.directionY;

          //drawing particle
          this.draw();
        }//update closing bracket

}


//creating the particles array
function init() {
    particlesArray = []; //creating array of particle objects, instead of list.
    let numberOfParticles = (canvas.height * canvas.width) / 8000; // Math for amount of particles in relation to the area of the canvas size.
    for ( let i=0; i< numberOfParticles; i++) {
        let size = (Math.random() * 5) + 1; // random number from 1-6
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let color = '#fff5eb';

        particlesArray.push(new Particle (x, y, directionX, directionY, size, color));
    
    }
}

//drawing line if the particles are close enough.
function connect(){
  let opacityValue = 1;
  for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
          let distance = (( particlesArray[a].x - particlesArray[b].x)
          * (particlesArray[a].x - particlesArray[b].x))
        + ((particlesArray[a].y - particlesArray[b].y) *
        (particlesArray[a].y - particlesArray[b].y));
        if (distance < (canvas.width/7) * (canvas.height/7)) {
            opacityValue = 1 - (distance/20000);
            ctx.strokeStyle = 'rgba(255,255,255,' + opacityValue + ')';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
        }
      }
  }
}
//looping the animation

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

// resizing the event along with window
window.addEventListener('resize',
    function(){
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        mouse.radius = ((canvas.height/100) * (canvas. height/100));
        init();
    }
);

//mouse out ending event, or else it reads the last position before exiting window forever.
window.addEventListener('mouseout',
    function(){
      mouse.x = undefined;
      mouse.x = undefined;
    }

)


  

init();
animate();



