var width = window.innerWidth;
var height = window.innerHeight;
var canvas = document.getElementById('Canvas');
var ctx = canvas.getContext("2d");
var ORgate = document.getElementById("OR");
var ANDgate = document.getElementById("AND");

let drag = false;
let mouseOverObject = '';

function gateFactory(x, y, name) {
  gates.append({x: x, y: y, ImName: name});
};

let And = {x: 10, y: 60, ImName: ANDgate};
let Or = {x: 80, y: 60, ImName: ORgate};
let mousepos = {x: 0, y: 0};
let gates = [And, Or];


function mouseOverWhat() {
  for (i = 0; i < gates.length; i++) {
    if (gates[i].x < mousepos.x && mousepos.x < gates[i].x + 50 && gates[i].y < mousepos.y && mousepos.y < gates[i].y + 50) {
      mouseOverObject = i;
      break;
    }
  }
}

function start() {
  ctx.beginPath();
  ctx.strokeStyle = '#FFFFFF';
  ctx.moveTo(0, height - 70);
  ctx.lineTo(width, height - 70);
  ctx.stroke(); 

  ctx.moveTo(70, height - 70);
  ctx.lineTo(70, height);
  ctx.stroke();

  ctx.moveTo(140, height - 70);
  ctx.lineTo(140, height);
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = '#FFFFFF';
  ctx.drawImage(ANDgate, 10, height - 60, 50, 50);
  ctx.fill();

  ctx.beginPath();
  ctx.fillStyle = '#FFFFFF';
  ctx.drawImage(ORgate, 80, height - 60, 50, 50);
  ctx.fill();
};

function draw(object) {
  ctx.beginPath();
  ctx.fillStyle = '#FFFFFF';
  ctx.drawImage(object.ImName, object.x, object.y, 50, 50);
  ctx.fill();
};

function mouseMoveListener(event) {
  mousepos.x = event.clientX;
  mousepos.y = event.clientY;
}

function mouseDownListener() {
  console.log(mousepos.x, mousepos.y);
  drag = true;
  mouseOverWhat();
  console.log(mouseOverObject, gates[mouseOverObject]);
  console.log(drag);
  if (mouseOverObject != '') {
    setTimeout(loop, 0);
    function loop() {
      gates[mouseOverObject].x = mousepos.x - 25;
      gates[mouseOverObject].y = mousepos.y - 25;
      if (drag) setTimeout(loop, 0);
    };
  };

};

function mouseUpListener(){
  drag = false;
  mouseOverObject = '';
  //add code: delete gate if at bottom
}

function animationLoop() {
  ctx.clearRect(0, 0, width, height);

  start();
  for (i = 0; i < gates.length; i++) {
    draw(gates[i])
  };

  window.requestAnimationFrame(animationLoop);
};

window.onload = () => {
  canvas.width = width;
  canvas.height = height;
  window.requestAnimationFrame(animationLoop);
};

canvas.addEventListener('mousedown', mouseDownListener);
canvas.addEventListener('mouseup', mouseUpListener);
canvas.addEventListener('mousemove', mouseMoveListener);