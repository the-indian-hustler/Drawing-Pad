const colorInput = document.getElementById('color');
const weight = document.getElementById('weight');
const clear = document.getElementById('clear');
const paths = [];
let currentPath = [];

const pencil = document.querySelector('#pencil');
const line = document.querySelector('#line');
const rect = document.querySelector('#rect');
const circle = document.querySelector('#circle');

let dataURL;

function setup(){
  createCanvas(window.innerWidth, window.innerHeight);
  background(255);
  dataURL = canvas.toDataURL();
}

function draw(){
  noFill();

  if(mouseIsPressed){
    const point={
      x: mouseX,
      y: mouseY,
      color: colorInput.value,
      weight: weight.value
    };
    currentPath.push(point);
  }

  paths.forEach(path=>{
    beginShape();
    path.forEach(point=>{
      stroke(point.color);
      strokeWeight(point.weight);
      vertex(point.x, point.y);
    });
    endShape();
  });
}

function mousePressed(){
  currentPath=[];
  if(pencil.checked){
    paths.push(currentPath);
  }
}

clear.addEventListener('click',()=>{
  paths.splice(0);
  background(255);
  dataURL = canvas.toDataURL();
});

window.onload = () => {
  var c = document.querySelector("#defaultCanvas0");
  var ctx = c.getContext("2d");
  let x1, y1, x2, y2, x3, y3;
  let gradient;
  let isDown = false;
  const color2 = document.querySelector('#color2');

  document.querySelector('#gradient').addEventListener('click', ()=>{
    if(document.querySelector('#gradient').checked){
      color2.disabled = false;
    } else {
      color2.disabled = true;
    }
  });

  document.querySelector('#defaultCanvas0').addEventListener("mousedown",(e)=>{
    x1 = e.clientX;
    y1 = e.clientY - 42;
    isDown = true;
  });

  document.querySelector('#defaultCanvas0').addEventListener("mousemove",(e)=>{
    if(isDown){
      const image = new Image();
      image.src = dataURL;
      image.addEventListener("load",()=>{
        ctx.drawImage(image,0,0,window.innerWidth,innerHeight);
      });
      drawing(e);
    }
  });

  document.querySelector('#defaultCanvas0').addEventListener("mouseup",(e)=>{
    isDown = false;
    drawing(e);
    dataURL = canvas.toDataURL();
  });

  function drawing(e){
    if(line.checked){
      x2 = e.clientX;
      y2 = e.clientY - 42;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      
      if(document.querySelector('#gradient').checked){
        gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, colorInput.value);
        gradient.addColorStop(1, color2.value);
        ctx.strokeStyle = gradient;
      } else {
        ctx.strokeStyle = colorInput.value;
      }
      
      ctx.lineWidth = weight.value;
      ctx.stroke();
    }
    else if(rect.checked){
      x2 = e.clientX;
      y2 = e.clientY - 42;

      ctx.beginPath();
      let width = x2 - x1;
      let height = y2 - y1;

      if(document.querySelector('#gradient').checked){
        gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, colorInput.value);
        gradient.addColorStop(1, color2.value);
        ctx.fillStyle = gradient;
      } else {
        ctx.fillStyle = colorInput.value;
      }

      ctx.fillRect(x1, y1, width, height);
    }
    else if(circle.checked){
      x2 = e.clientX;
      y2 = e.clientY - 42;

      ctx.beginPath();
      let radius = Math.abs(Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1))) / 2;

      if(document.querySelector('#gradient').checked){
        gradient = ctx.createRadialGradient(x1, y1, radius * 0.1, x1, y1, radius);
        gradient.addColorStop(0, colorInput.value);
        gradient.addColorStop(1, color2.value);
        ctx.fillStyle = gradient;
      } else {
        ctx.fillStyle = colorInput.value;
      }

      ctx.arc(x1, y1, radius, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
};
