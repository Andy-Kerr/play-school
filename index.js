function load() {
  canvas = document.getElementById("canvas")
  w = 1680
  h = 976
  xScale = window.innerWidth / w
  yScale = window.innerHeight / h
  if (Math.abs((xScale / yScale) - 1) > 0.1) {
    xScale = yScale = Math.min(xScale, yScale)
  }
  canvas.width = w * xScale;
  canvas.height = h * yScale;
  ctx = canvas.getContext("2d");
  ctx.scale(xScale, yScale);
  mouseX = w / 2
  mouseY = h / 2

  commencedIntro = false;
  pinkG = ctx.createLinearGradient(0, 0, 0, h);
  pinkG.addColorStop(0, "#8f6ad3");
  pinkG.addColorStop(1, "#ff8888");


  var PSLo = localStorage.getItem("PSLo") || "home()"
  localStorage.setItem("PSLo", "home()")
  try {
    eval(PSLo)
  } catch (err) {
    home();
  }

}
// ----------------------------------------  Home -------------------------------------------
function home() {
  ctx.drawImage(document.getElementById("Load"), 0, 0, w, h)
  canvas.addEventListener("mousedown", function(event) {
    if (!commencedIntro) {
      if (event.x / xScale < w / 1.5) {
        commencedIntro = true;
        intro();
      } else {
        localStorage.setItem("PSLo", "windows()")
        location.reload()
      }
    }
  });
  ctx.fillStyle = "#333333"
  ctx.font = '150px Nunito-Bold';
  ctx.textAlign = 'left';
  ctx.fillText("Play School", 80, 180);
  ctx.font = '80px Nunito-Bold';
  ctx.fillText("By Andrew Kerr", 80, 300);
  ctx.font = '50px Nunito-Italic';
  ctx.fillText("Skip to Windows...", w - 500, h - 50);
}
// ----------------------------------------  Intro ------------------------------------------
function intro() {
  //make with a ton of set timeouts???
  //or with a set interval timer ++, and if time = x, do it, and then you can also have animations
  //yeah probs setint.
  var time = 0;
  var music = document.getElementById("Intro")
  var offset = 0;
  var zoom = 0;
  music.play()
  setInterval(update, 20); //50 hertz
  function update() {
    time += 0.02
    offset = h / 2 * (Math.tanh((time - 9) * 2) + 1)
    offset2 = h / 2 * (Math.tanh((time - 16.5) * 2) + 1)
    offset3 = h / 2 * (Math.tanh((time - 17.5) * 2) + 1)
    zoom = 15 * (Math.tanh((time - 15) * 2) + 1) + 1
    ctx.fillStyle = "#bbf9ff"
    ctx.fillRect(0, 0, w, h)
    //Bear
    if (time > 3) {
      ctx.drawImage(document.getElementById("Chair"), w / 2 - 256, h / 2 - 180 - offset, 512, 512)
    }
    ctx.drawImage(document.getElementById("Bear" + ['1', '2', '3', '4', '5', '6', '7', '6', '5', '4', '3', '2'][Math.floor((time * 20) % 12)]), (w - 324.58 * 1.5) / 2, (h - 397.09 * 1.5) / 2 - 80 - offset, 324.58 * 1.5, 397.09 * 1.5);
    if (time > 5) {
      ctx.drawImage(document.getElementById("Ball"), (time - 6) * 500, 600 - 150 * Math.abs(Math.sin(time * 3) * 2) - offset, 300, 300)
    }
    ctx.drawImage(document.getElementById("Home"), w / 2 - w * zoom / 2, h - offset + (h / 2 - h * zoom / 2), w * zoom, h * zoom)
    if (time > 11.5) {
      ctx.drawImage(document.getElementById("Door"), w / 2 - w * zoom / 2, h - offset + (h / 2 - h * zoom / 2), w * zoom, h * zoom)
    }
    if (time > 16.5) {
      ctx.drawImage(document.getElementById("PS"), 0, offset2 - h, w, h)
      ctx.textAlign = 'center'
      ctx.fillStyle = "black"
      ctx.font = "250px Nunito-Bold"
      ctx.fillText("Play", w / 2, offset3 - h / 2 - 100)
      ctx.fillText("School", w / 2, offset3 - h / 2 + 250)
      ctx.fillStyle = "white"
      ctx.fillText("Play", w / 2 + 10, offset3 - h / 2 - 100 + 10)
      ctx.fillText("School", w / 2 + 10, offset3 - h / 2 + 250 + 10)
    }

    if (time > 25) {
      localStorage.setItem("PSLo", "windows()")
      location.reload()
    }
  }
}
// ----------------------------------------  Windows ----------------------------------------
function windows() {
  canvas.addEventListener("mousedown", function(event) {
    if (event.y / yScale > h / 2) {
      if (event.x / xScale < w / 4) { //Circle
        localStorage.setItem("PSLo", "big()")
      } else if (event.x / xScale > w * 0.75) { //Diamond
        localStorage.setItem("PSLo", "humpty()")
      } else if (event.x / xScale < w / 2) { //Arch
        localStorage.setItem("PSLo", "jemima()")
      } else { //Square
        localStorage.setItem("PSLo", "little()")
      }
      location.reload();
    }
  });
  ctx.drawImage(document.getElementById("Windows"), 0, 0, w, h);
  ctx.fillStyle = "black"
  ctx.font = '140px Nunito';
  ctx.textAlign = 'left';
  ctx.fillText("The Windows", 100, 200);
  ctx.font = '80px Nunito-Italic';
  ctx.fillText("Where will you go today?", 100, 340);
}
// ----------------------------------------  Humpty Dumpty ----------------------------------
function humpty() {
  canvas.addEventListener("mousedown", function(event) {
    if (event.y / yScale > h / 2 && event.x / xScale < w / 2) {
      localStorage.setItem("PSLo", "humptyGame()")
    } else {
      localStorage.setItem("PSLo", "windows()")
    }
    location.reload();
  });
  ctx.fillStyle = '#bbf9ff';
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(document.getElementById("City"), 0, 300, w, h);
  ctx.fillStyle = "black"
  ctx.font = '140px Nunito';
  ctx.textAlign = 'left';
  ctx.fillText("Humpty Dumpty", 100, 160);
  ctx.font = '80px Nunito-Italic';
  ctx.fillText("Fun Ways to Die", 100, 270);
  ctx.fillStyle = "white"
  ctx.font = '500px Nunito';
  ctx.fillText("\u25BA", 200, 845);
  ctx.drawImage(document.getElementById("Humpty"), 900, 300, 600, 600)
}

function humptyGame() {
  var engine = Matter.Engine.create();
  var world = engine.world;
  var mousey = Matter.Mouse.create()
  var timeT = 0
  var timeR = 0

  Matter.Mouse.setScale(mousey, {
    x: 1 / xScale,
    y: 1 / yScale
  })
  var mcon = Matter.MouseConstraint.create(engine, {
    element: canvas,
    constraint: {
      stiffness: 0.2
    },
    mouse: mousey
  })
  Matter.World.add(world, mcon);

  canvas.addEventListener("mousedown", function(event) {
    var evy = event.y / yScale
    var evx = event.x / xScale
    if (evy > h - 110) {
      if (evx < 200) {
        localStorage.setItem("PSLo", "humptyGame()")
        location.reload();
      } else if (evx > w - 200) {
        localStorage.setItem("PSLo", "windows()")
        location.reload();
      } else if (evx > 950 - 20) {
        timeT = 0
        Matter.World.add(world, Matter.Bodies.rectangle(0, h - 150, 100, 300, {
          isStatic: false,
          inertia: Infinity,
          label: "run"
        }));
      } else if (evx > 800 - 20) {
        var bodies = Matter.Composite.allBodies(engine.world);
        for (var i = 0; i < bodies.length; i += 1) {
          Matter.Body.applyForce(bodies[i], {
            x: 0,
            y: 0
          }, {
            x: (Math.random() - 0.5) * 0.1,
            y: Math.random() - 0.5
          });
        }
      } else if (evx > 650 - 20) {
        for (var i = 0; i < 50; i++) {
          Matter.World.add(world, Matter.Bodies.rectangle(Math.random() * w, 0 - Math.random() * h, brickW, brickH, {
            isStatic: false,
            angle: Math.random() * Math.PI,
            label: "brick"
          }));
        }
      } else if (evx > 500 - 20) {
        timeR = 0
        Matter.World.add(world, Matter.Bodies.polygon(0, h / 1.5, 3, -140, {
          isStatic: false,
          inertia: Infinity,
          label: "rocket"
        }));
      }
    }
  })

  //Order by view layer order:
  //FLOOR
  Matter.World.add(world, Matter.Bodies.rectangle(w / 2, h - 50, 2 * w, 200, {
    isStatic: true,
    label: "floor"
  }));
  //BRICKS
  brickW = 150
  brickH = 60
  for (var x = 1; x < 7; x++) {
    for (var y = 1; y < 6; y++) {
      Matter.World.add(world, Matter.Bodies.rectangle(x * brickW + (y % 2 == 0 ? brickW / 2 : 0) + ((x == 1 && y % 2 == 1) ? brickW / 2 : 0) - ((x == 6 && y % 2 == 0) ? brickW / 2 : 0) + 200, h - (y) * brickH - 100, ((x == 1 && y % 2 == 1) || (x == 6 && y % 2 == 0)) ? brickW / 2 : brickW, brickH, {
        isStatic: false,
        label: "brick"
      }));
    }
  }
  //Humpty
  Matter.World.add(world, Matter.Bodies.polygon(w / 2, h / 3, 8, 50, {
    isStatic: false,
    label: "humpty"
  }));

  Matter.Engine.run(engine);
  (function render() {
    timeT++;
    timeR++;
    var bodies = Matter.Composite.allBodies(engine.world);
    window.requestAnimationFrame(render);
    ctx.fillStyle = '#bbf9ff';
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(document.getElementById("City"), 0, 0, w, h);
    //FLOOR
    ctx.fillStyle = '#101f2a';
    ctx.fillRect(0, h / 1.3, w, h)
    //fills
    for (var i = 0; i < bodies.length; i += 1) {
      ctx.beginPath();
      var vertices = bodies[i].vertices;
      ctx.moveTo(vertices[0].x, vertices[0].y);
      for (var j = 1; j < vertices.length; j += 1) {
        ctx.lineTo(vertices[j].x, vertices[j].y);
      }
      ctx.lineTo(vertices[0].x, vertices[0].y);

      var type = bodies[i].label
      if (type == "brick" || type == "humpty") {
        ctx.fillStyle = "#9e0303"
        ctx.fill()
      }
    }
    //strokes/other
    for (var i = 0; i < bodies.length; i += 1) {
      ctx.beginPath();
      var body = bodies[i]
      var vertices = body.vertices;
      var pos = body.position;
      ctx.moveTo(vertices[0].x, vertices[0].y);
      for (var j = 1; j < vertices.length; j += 1) {
        ctx.lineTo(vertices[j].x, vertices[j].y);
      }
      ctx.lineTo(vertices[0].x, vertices[0].y);
      ctx.lineTo(vertices[1].x, vertices[1].y);

      var type = bodies[i].label
      if (type == "brick") {
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'white';
        ctx.stroke();
      }
    }
    for (var i = 0; i < bodies.length; i += 1) {
      ctx.beginPath();
      var body = bodies[i]
      var vertices = body.vertices;
      var pos = body.position;
      ctx.moveTo(vertices[0].x, vertices[0].y);
      for (var j = 1; j < vertices.length; j += 1) {
        ctx.lineTo(vertices[j].x, vertices[j].y);
      }
      ctx.lineTo(vertices[0].x, vertices[0].y);
      ctx.lineTo(vertices[1].x, vertices[1].y);

      var type = bodies[i].label
      if (type == "rocket") {
        pos.x = timeR * 60
        pos.y = h / 1.5
        ctx.drawImage(document.getElementById("Rocket2"), pos.x - 500, pos.y - 200, 500, 300)
      }
      if (type == "run") {
        ctx.drawImage(document.getElementById("BT" + ['0', '1', '2', '3', '4', '3', '2', '1'][Math.floor((timeT / 2) % 8)]), timeT * 15 - 200, h - 430, 200, 300);
        pos.x = timeT * 15
        pos.y = h - 200
      }
      if (type == "humpty") {
        ctx.save()
        ctx.translate(pos.x, pos.y)
        ctx.rotate(body.angle)
        ctx.drawImage(document.getElementById("Humpty"), -100, -100, 200, 200)
        ctx.restore()
      }
    }
    ctx.drawImage(document.getElementById("fix"), 50, h - 110, 90, 90)
    ctx.drawImage(document.getElementById("missile"), 500, h - 110, 90, 90)
    ctx.drawImage(document.getElementById("wall"), 650, h - 110, 90, 90)
    ctx.drawImage(document.getElementById("exp"), 800, h - 110, 90, 90)
    ctx.drawImage(document.getElementById("bear"), 950, h - 110, 90, 90)
    ctx.drawImage(document.getElementById("windy"), w - 130, h - 110, 90, 90)
  })();
}
// ----------------------------------------  Little Ted -------------------------------------
function little() {
  canvas.addEventListener("mousedown", function(event) {
    if (event.y / yScale > h / 3 && event.x / xScale < w / 2) {
      if (event.y / yScale > h * 7 / 9) {
        //SL
        localStorage.setItem("PSLo", "littleGame(1500)")
      } else if (event.y / yScale > h * 7 / 12) {
        //GS
        localStorage.setItem("PSLo", "littleGame(2000)");
      } else {
        //DH
        localStorage.setItem("PSLo", "littleGame(3500)")
      }
    } else {
      localStorage.setItem("PSLo", "windows()")
    }
    location.reload();
  });
  ctx.drawImage(document.getElementById("Snow"), 0, 0, w, h);
  ctx.fillStyle = "black"
  ctx.font = '140px Nunito';
  ctx.textAlign = 'left';
  ctx.fillText("Little Ted", 70, 160);
  ctx.font = '80px Nunito-Italic';
  ctx.fillText("FIS Alpine Ski Racing", 70, 270);
  ctx.font = '82px Nunito-Bold';
  ctx.fillText("Downhill", 240, 475);
  ctx.fillText("Giant Slalom", 240, 660);
  ctx.fillText("Slalom", 240, 845);
}

function littleGame(sp) {
  var skiDist = 6;
  var mouseX = null;
  var mouseY = null;
  var moveX = w / 2;
  var moveY = h / 3;
  var time = 0;
  var angle = 0;
  var oldAngle = angle;
  var length = 6;
  var maxSpeed = (20 + sp / 200) * 2;
  var acc = 1.03;
  var speed = maxSpeed / 100;
  var x = w / 2 + 200;
  var y = 0;
  var red = 0;
  var countdown = 4;
  var req = null;
  var treeD = sp / 10;
  var nTree = (length + 0.5) * treeD;
  var stringScore = null;
  var intTen = null;
  var int = null;
  var timer = 0;
  var gateN = Math.floor(((y + sp / 2) / sp) - 1);
  var nextRedGate = sp - y + sp * gateN;
  var nextBlueGate = sp * 1.5 - y + sp * gateN;
  var courseL = (length + 0.5) * 2 * sp;
  var yFall = speed * Math.cos(angle) * (1 - (Math.abs(angle) / 3));


  var record = parseInt(localStorage.getItem("ski" + (sp).toString() + "-" + (length).toString()));
  if (localStorage.getItem("skiPlay" + (sp).toString() + "-" + (length).toString()) !== "hey") {
    localStorage.setItem("ski" + (sp).toString() + "-" + (length).toString(), "1000");
    record = parseInt(localStorage.getItem("ski" + (sp).toString() + "-" + (length).toString()));
  }

  ctx.font = "180px Nunito";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";

  canvas.addEventListener("mousedown", function(event) {
    mouseX = event.x
    mouseY = event.y
  });
  canvas.addEventListener("mousemove", function(event) {
    moveX = event.x / xScale;
    moveY = event.y / yScale;
  });
  canvas.addEventListener("mouseup", function(event) {
    mouseX = null;
    mouseY = null;
  });

  update();

  function update() {

    if (countdown < 0.02) {
      if (h / 3 < (-y + sp * length + sp / 2)) {
        time += 0.02;
      }
      y += speed * Math.cos(angle) * (1 - (Math.abs(angle) / 3));
      x += speed * Math.sin(angle) * (1 - (Math.abs(angle) / 3));

      oldAngle = angle
      if (((Math.atan2(h / 3 - moveY, w / 2 - moveX)) + 1.57) < 1.57 && ((Math.atan2(h / 3 - moveY, w / 2 - moveX)) + 1.57) > -1.57) {
        angle = (Math.atan2(h / 3 - moveY, w / 2 - moveX)) + 1.57;
      }
      if (mouseX !== null) {
        maxSpeed = (20 + sp / 200) * 3 / 2;
      } else {
        maxSpeed = 20 + sp / 200;
      }

      if (speed < maxSpeed && h / 3 < (-y + sp * length + sp / 2)) {
        speed = speed * acc;
      } else {
        speed = speed / acc;
      }

      speed = speed / ((1 + Math.abs(oldAngle - angle) / 2));

      if (speed < maxSpeed / 100 && h / 3 < (-y + sp * length + sp / 2)) {
        speed = maxSpeed / 100;
      }

      if (red > 0) {
        red -= 0.02;
      }

      yFall = speed * Math.cos(angle) * (1 - (Math.abs(angle) / 3));
      gateN = Math.floor(((y + sp / 2) / sp) - 1);;
      nextRedGate = sp - y + sp * gateN;
      nextBlueGate = sp * 1.5 - y + sp * gateN;
      if (gateN >= 0 && gateN < length) {
        if (h / 3 < nextRedGate && h / 3 > nextRedGate - yFall) {
          ctx.beginPath();
          ctx.rect(-400 + x + 20, nextRedGate - yFall, 360, yFall);
          if (!ctx.isPointInPath(w / 2 * xScale, h / 3 * yScale)) {
            miss();
          }
        }
        if (h / 3 < nextBlueGate && h / 3 > nextBlueGate - yFall) {
          ctx.beginPath();
          ctx.rect(200 + x + 20, nextBlueGate - yFall, 360, yFall);
          if (!ctx.isPointInPath(w / 2 * xScale, h / 3 * yScale)) {
            miss();
          }
        }
      }

    } else {
      countdown -= 0.02;
    }


    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, w, h);

    ctx.lineWidth = 20;
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(x, 400 - y + 10);
    ctx.lineTo(x - 400, 400 - y + 10);
    ctx.stroke();
    ctx.closePath();

    ctx.lineWidth = 10;
    ctx.strokeStyle = "powderblue";
    ctx.beginPath();
    ctx.moveTo(0 + x, 400 - y);
    ctx.lineTo(0 + x, sp - y);
    ctx.quadraticCurveTo(0 + x, sp * 9 / 8 - y, 300 + x, sp * 5 / 4 - y);
    ctx.moveTo(300 + x, sp / 4 + length * sp - y);
    ctx.quadraticCurveTo(600 + x, sp * 3 / 8 + length * sp - y, 600 + x, sp / 2 + length * sp - y);
    ctx.stroke();
    ctx.closePath();

    for (var i = 1; i < length; i++) {
      ctx.beginPath();
      ctx.moveTo(300 + x, sp / 4 + i * sp - y);
      ctx.quadraticCurveTo(600 + x, sp * 3 / 8 + i * sp - y, 600 + x, sp / 2 + i * sp - y);
      ctx.moveTo(600 + x, sp / 2 + i * sp - y);
      ctx.quadraticCurveTo(600 + x, sp * 5 / 8 + i * sp - y, 300 + x, sp * 3 / 4 + i * sp - y);
      ctx.moveTo(300 + x, sp * 3 / 4 + i * sp - y);
      ctx.quadraticCurveTo(0 + x, sp * 7 / 8 + i * sp - y, 0 + x, sp + i * sp - y);
      ctx.moveTo(0 + x, sp + i * sp - y);
      ctx.quadraticCurveTo(0 + x, sp * 9 / 8 + i * sp - y, 300 + x, sp * 1.25 + i * sp - y);
      ctx.stroke();
      ctx.closePath();
    }
    ctx.beginPath();
    ctx.moveTo(-400 + x, 400 - y);
    ctx.lineTo(-400 + x, sp - y);
    ctx.quadraticCurveTo(-400 + x, sp * 9 / 8 - y, -100 + x, sp * 5 / 4 - y);
    ctx.moveTo(-100 + x, sp / 4 + length * sp - y);
    ctx.quadraticCurveTo(200 + x, sp * 3 / 8 + length * sp - y, 200 + x, sp / 2 + length * sp - y);
    ctx.stroke();
    ctx.closePath();
    for (var i = 1; i < length; i++) {
      ctx.beginPath();
      ctx.moveTo(-100 + x, sp / 4 + i * sp - y);
      ctx.quadraticCurveTo(200 + x, sp * 3 / 8 + i * sp - y, 200 + x, sp / 2 + i * sp - y);
      ctx.moveTo(200 + x, sp / 2 + i * sp - y);
      ctx.quadraticCurveTo(200 + x, sp * 5 / 8 + i * sp - y, -100 + x, sp * 3 / 4 + i * sp - y);
      ctx.moveTo(-100 + x, sp * 3 / 4 + i * sp - y);
      ctx.quadraticCurveTo(-400 + x, sp * 7 / 8 + i * sp - y, -400 + x, sp + i * sp - y);
      ctx.moveTo(-400 + x, sp + i * sp - y);
      ctx.quadraticCurveTo(-400 + x, sp * 9 / 8 + i * sp - y, -100 + x, sp * 5 / 4 + i * sp - y);
      ctx.stroke();
      ctx.closePath();
    }
    ctx.lineWidth = 20;
    ctx.strokeStyle = "red";
    ctx.beginPath()
    ctx.moveTo(0, -y + sp * length + sp / 2 - 10)
    ctx.lineTo(w, -y + sp * length + sp / 2 - 10)
    ctx.stroke();
    ctx.closePath();


    for (var i = 0; i < length; i++) {
      drawGate(x, sp - y + sp * i, "blue");
      drawGate(x + 200, sp * 1.5 - y + sp * i, "red");
    }

    ctx.save();
    ctx.translate(w / 2, h / 3);
    ctx.rotate(angle);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#DFF2F5";
    ctx.beginPath();
    ctx.moveTo(-37.5, 0);
    ctx.lineTo(-37.5, -speed * 3.5 * Math.random() * (1 - (Math.abs(angle) / 3)));
    ctx.moveTo(-25, 0);
    ctx.lineTo(-25, -speed * 4 * Math.random() * (1 - (Math.abs(angle) / 3)));
    ctx.moveTo(-12.5, 0);
    ctx.lineTo(-12.5, -speed * 3 * Math.random() * (1 - (Math.abs(angle) / 3)));
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -speed * 5 * Math.random() * (1 - (Math.abs(angle) / 3)));
    ctx.moveTo(12.5, 0);
    ctx.lineTo(12.5, -speed * 3.5 * Math.random() * (1 - (Math.abs(angle) / 3)));
    ctx.moveTo(25, 0);
    ctx.lineTo(25, -speed * 4.5 * Math.random() * (1 - (Math.abs(angle) / 3)));
    ctx.moveTo(37.5, 0);
    ctx.lineTo(37.5, -speed * 3 * Math.random() * (1 - (Math.abs(angle) / 3)));
    ctx.stroke();
    ctx.closePath();
    ctx.restore();

    ctx.fillStyle = 'red';
    ctx.fillText("Start", x - 200, 300 - y);
    ctx.fillText("Finish", x + 400, -y + sp * length + sp / 2 + 125);

    drawRotated(angle);

    drawTree();

    ctx.fillStyle = 'black';
    ctx.font = "300px Nunito";
    if (countdown < 0.02) {
      ctx.font = "180px Nunito";
      if (red > 0) {
        ctx.fillStyle = 'red';
      }
      ctx.textAlign = "left";
      if (h / 3 < (-y + sp * length + sp / 2)) {
        ctx.fillText(Math.floor(time).toString(), 50, 100);
      } else {
        ctx.fillText((time).toString().slice(0, 3 + Math.log10(time)), 50, 100);
      }
      ctx.textAlign = "center";
    } else if (Math.floor(countdown) !== 0) {
      ctx.fillText(Math.floor(countdown).toString(), w / 2, h / 1.5);
    } else {
      ctx.fillText("Go", w / 2, h / 1.5);
    }
    ctx.font = "180px Nunito";

    req = requestAnimationFrame(update)

    if (speed < maxSpeed / 105) {
      cancelAnimationFrame(req);
      stringScore = (time).toString().slice(0, 3 + Math.log10(time));
      intTen = Math.floor(time * 10);
      int = setInterval(fade, 10);
    }
  }

  function tan(n) {
    return Math.tan(n * Math.PI / 180);
  }

  function drawRotated(rad) {
    ctx.save();
    ctx.translate(w / 2, h / 3);
    ctx.rotate(rad);
    ctx.drawImage(document.getElementById("skier"), -120, -120, 240, 240);
    ctx.restore();
  }

  function drawTree() {
    for (var i = 0; i < nTree; i++) {
      ctx.drawImage(document.getElementById("tree"), x - w / 2 - ((i * Math.sqrt(i) * 3457) % 2000), (sp + sp * i) / treeD + ((i * Math.sqrt(i) * 757) % 100) - 355 - y, 225, 225);
      ctx.drawImage(document.getElementById("tree"), x + w / 2 + ((i * Math.sqrt(i) * 3457) % 2000), (sp * 1.5 + sp * i) / treeD + ((i * Math.sqrt(i) * 757) % 100) - 355 - y, 225, 225);
    }
  }


  function drawGate(w, u, c) {
    if (c == "red") {
      var y = u - 80;
      var x = w
      ctx.fillStyle = "#ff4444";
      ctx.strokeStyle = "#ff4444";
      ctx.lineWidth = 10;
      if (sp > 1500) {
        ctx.fillRect(x - 80, y - 60, 80, 60);
      }
      ctx.beginPath();
      if (sp > 1500) {
        ctx.moveTo(x - 80, y - 80);
        ctx.lineTo(x - 80, y + 80);
      }
      ctx.moveTo(x, y - 80);
      ctx.lineTo(x, y + 80);
      ctx.stroke();
      ctx.closePath();
      x += 480;
      if (sp > 1500) {
        ctx.fillRect(x - 80, y - 60, 80, 60);
      }
      ctx.beginPath();
      ctx.moveTo(x - 80, y - 80);
      ctx.lineTo(x - 80, y + 80);
      if (sp > 1500) {
        ctx.moveTo(x, y - 80);
        ctx.lineTo(x, y + 80);
      }
      ctx.stroke();
      ctx.closePath();
    }
    if (c == "blue") {
      var y = u - 80;
      var x = w;
      ctx.fillStyle = "#006eff";
      ctx.strokeStyle = "#006eff";
      ctx.lineWidth = 10;
      if (sp > 1500) {
        ctx.fillRect(x, y - 60, 80, 60);
      }
      ctx.beginPath();
      ctx.moveTo(x, y - 80);
      ctx.lineTo(x, y + 80);
      if (sp > 1500) {
        ctx.moveTo(x + 80, y - 80);
        ctx.lineTo(x + 80, y + 80);
      }
      ctx.stroke();
      ctx.closePath();
      x -= 480;
      if (sp > 1500) {
        ctx.fillRect(x, y - 60, 80, 60);
      }
      ctx.beginPath();
      if (sp > 1500) {
        ctx.moveTo(x, y - 80);
        ctx.lineTo(x, y + 80);
      }
      ctx.moveTo(x + 80, y - 80);
      ctx.lineTo(x + 80, y + 80);

      ctx.stroke();
      ctx.closePath();
    }
  }

  function fade() {
    //
    // Recode, redesign, remove all shit, and replace  with simple image endScreen !!!!!
    //
    if (intTen < record) {
      localStorage.setItem("ski" + (sp).toString() + "-" + (length).toString(), intTen.toString())
    }
    localStorage.setItem("skiPlay" + (sp).toString() + "-" + (length).toString(), "hey");
    timer += 10;
    ctx.globalAlpha = (timer / 2000);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(document.getElementById("tree"), w / 10, h / 4 + 50, 400, 400);
    ctx.drawImage(document.getElementById("tree"), w / 10 - 100, h / 3 + 100, 400, 400);
    ctx.drawImage(document.getElementById("tree"), w - 450, h / 6, 400, 400);
    ctx.font = "140px Nunito";
    ctx.fillStyle = "black";
    ctx.textAlign = "left";
    ctx.fillText("Time ", 50, h / 8);
    ctx.fillText(stringScore + "s", w / 4, h / 8);
    ctx.fillStyle = "rgb(255,50,50)";
    ctx.textAlign = "right";
    ctx.fillText("Record " + (parseInt(record) / 10).toString() + ((Number.isInteger(parseInt(record) / 10)) ? ".0s" : "s"), w - 50, h * 0.85);
    ctx.fillStyle = "white";
    ctx.fillRect(w / 2 - 75, h / 3 - 75, 150, 150);
    angle = (Math.atan2(h / 3 - moveY, w / 2 - moveX)) + 1.57;
    drawRotated(angle);
    ctx.fillStyle = "rgb(180,141,81)";
    ctx.strokeStyle = "rgb(180,141,81)";
    ctx.fillRect(w / 1.5 - 50, h / 2, 150, 100);
    ctx.rect(w / 1.5 - 50, h / 2, 150, 100);
    ctx.fillRect(w / 3 - 50, h / 1.5, 150, 100);
    ctx.rect(w / 3 - 50, h / 1.5, 150, 100);
    if (ctx.isPointInPath(mouseX, mouseY)) {
      localStorage.setItem("PSLo", mouseX / canvas.width < 1 / 2 ? "windows()" : "little()");
      location.reload();
    }
    //This probs wont work ^^^ scaling
    ctx.beginPath();
    ctx.moveTo(w / 3 + 25, h / 1.5 + 80);
    ctx.lineTo(w / 3 + 25, h / 1.5 + 150);
    ctx.moveTo(w / 1.5 + 25, h / 2 + 80);
    ctx.lineTo(w / 1.5 + 25, h / 2 + 150);
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.font = "45px Nunito";
    ctx.fillText("\u2190 To", w / 3 + 80, h / 1.5 + 30);
    ctx.fillText("Home", w / 3 + 80, h / 1.5 + 70);
    ctx.textAlign = "left";
    ctx.fillText("To \u2192", w / 1.5 - 30, h / 2 + 30);
    ctx.fillText("Start", w / 1.5 - 30, h / 2 + 70);
  }

  function miss() {
    red = 0.8;
    time += 3;
  }
}
// ----------------------------------------  Big Ted ----------------------------------------
function big() {
  canvas.addEventListener("mousedown", function(event) {
    if (event.y / yScale < h / 2 && event.x / xScale > w / 2) {
      localStorage.setItem("PSLo", "bigGame()")
    } else {
      localStorage.setItem("PSLo", "windows()")
    }
    location.reload();
  });
  ctx.drawImage(document.getElementById("Forest"), 0, 0, w, h);
  ctx.fillStyle = "black"
  ctx.font = '140px Nunito';
  ctx.textAlign = 'left';
  ctx.fillText("Big Ted", 100, 160);
  ctx.font = '80px Nunito-Italic';
  ctx.fillText("Jumps Big.", 100, 270);
}

function bigGame() {
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  course = "   ";
  for (var i = 0; i < 2000; i++) {
    var optionsc = [" ", " ", " ", "x ", "s", "m", "l ", "sl ", "s l m  x s "];
    course += optionsc[Math.floor(Math.random() * optionsc.length)];
  }
  var air = 0;
  var vel = 0;
  var sp = 500;
  var t = 0;
  var bonus = 1;
  var speed = 20;
  var running = true;
  update();

  window.addEventListener('keypress', function(e) {
    if (air == 0) {
      vel = 27;
      bonus = 1;
    } else if (bonus == 1) {
      vel = 15;
      bonus = 0;
    }
  })

  function update() {
    t += speed;
    vel--;
    air += vel;
    if (air < 0) {
      vel = 0;
      air = 0;
    }
    ctx.fillStyle = "#bbf9ff"
    ctx.fillRect(0, 0, w, h / 2)
    ctx.drawImage(document.getElementById("back"), -(t / 30) % w + w, 0, w * 1.5, h)
    ctx.drawImage(document.getElementById("back"), -(t / 30) % w, 0, w * 1.5, h)
    ctx.drawImage(document.getElementById("back"), -(t / 30) % w - w, 0, w * 1.5, h)
    ctx.drawImage(document.getElementById("front"), -(t / 15) % w + w, 0, w * 1.5, h)
    ctx.drawImage(document.getElementById("front"), -(t / 15) % w, 0, w * 1.5, h)
    ctx.drawImage(document.getElementById("front"), -(t / 15) % w - w, 0, w * 1.5, h)
    ctx.fillStyle = "#97db99"
    ctx.fillRect(0, h * 0.55, w, h)
    ctx.drawImage(document.getElementById("trees"), -(t / 2) % w, 0, w * 1.5, h)
    ctx.drawImage(document.getElementById("trees"), -(t / 2) % w + w, 0, w * 1.5, h)
    ctx.fillStyle = "black";
    ctx.font = '100px Nunito';
    ctx.textAlign = 'left';
    for (var i = Math.floor(t / sp); i < Math.floor(t / sp) + 10; i++) {
      if (course.charAt(i) == "s") {
        ctx.drawImage(document.getElementById("LogS"), sp * i - t, h - 132 - 50, 140, 132);
        ctx.beginPath();
        ctx.rect(sp * i - t + 70, h - 50, -20, -132);
        test();
      }
      if (course.charAt(i) == "m") {
        ctx.drawImage(document.getElementById("LogM"), sp * i - t, h - 188 - 50, 200, 188);
        ctx.beginPath();
        ctx.rect(sp * i - t + 100, h - 50, -20, -188);
        test();
      }
      if (course.charAt(i) == "l") {
        ctx.drawImage(document.getElementById("LogL"), sp * i - t, h - 238 - 50, 266, 238);
        ctx.beginPath();
        ctx.rect(sp * i - t + 133, h - 50, -20, -238);
        test();
      }
      if (course.charAt(i) == "x") {
        ctx.drawImage(document.getElementById("LogXL"), sp * i - t, h - 290 - 50, 326, 290);
        ctx.beginPath();
        ctx.rect(sp * i - t + 163, h - 50, -20, -290);
        test();
      }
    }
    if (running) {
      //ctx.drawImage(document.getElementById("kang"), 200, h - air - 225 - 50, 300, 225);
      ctx.drawImage(document.getElementById("BT" + (air > 0 ? (bonus ? "0" : "4") : ['0', '1', '2', '3', '4', '3', '2', '1'][Math.floor((t / (60)) % 8)])), 250, h - air - 300 - 50, 200, 300);
      ctx.fillText(Math.floor(t / 1000).toString(), 60, 60)
      requestAnimationFrame(update);
    }
  }

  function test() {
    if (ctx.isPointInPath(350 * xScale, (h - air - 50) * yScale)) {
      running = false;

      var score = Math.floor(t / 1000)
      var pastHS = parseInt(localStorage.getItem("BigTedHS"))
      if (!(pastHS > 0)) {
        pastHS = 0
        localStorage.setItem("BigTedHS", 0);
      }
      if (score > pastHS) {
        localStorage.setItem("BigTedHS", score.toString());
      }
      setTimeout(function() {
        ctx.textAlign = "center"
        ctx.fillStyle = "white"
        ctx.fillRect(w / 7, h / 2.5 - 250, w / 3.5, h / 2.5)
        ctx.fillRect(w * 4 / 7, h / 2.5 - 250, w / 3.5, h / 2.5)
        ctx.fillRect(w * 95 / 100, h * 91 / 100, w * 4.5 / 100, h * 8 / 100)
        ctx.fillRect(w * 0.5 / 100, h * 91 / 100, w * 4.5 / 100, h * 8 / 100)
        ctx.fillStyle = "black";
        ctx.font = "80px Nunito";
        ctx.fillText("Highscore", w * 5 / 7, (h) * 6.7 / 14 - 250)
        ctx.fillText("Score", w * 2 / 7, (h) * 6.7 / 14 - 250)
        ctx.font = "200px Nunito";
        ctx.fillText(score.toString(), w * 2 / 7, h * 4.6 / 7 - 250)
        ctx.fillText(pastHS.toString(), w * 5 / 7, h * 4.6 / 7 - 250)
        ctx.font = "70px Nunito";
        ctx.fillText("\u21BB", w * 97.2 / 100, (h) * .955)
        ctx.fillText("\u2302", w * 2.8 / 100, (h) * .955)
        ctx.fillStyle = "white";
        ctx.fillRect(w, 0, 10 * w, h);
      }, 20);
      setTimeout(function() {
        window.addEventListener('keypress', function(e) {
          localStorage.setItem("PSLo", "bigGame()")
          location.reload();
        })
      }, 400);
      canvas.addEventListener("mousedown", function(event) {
        mouseX = event.x / xScale;
        mouseY = event.y / yScale;
        if (mouseY > 850 && mouseX < 200) {
          localStorage.setItem("PSLo", "windows()")
          location.reload();
        }
        if (mouseY > 850 && mouseX > w - 200) {
          localStorage.setItem("PSLo", "bigGame()")
          location.reload();
        }
      });
    }

  }
}
// ----------------------------------------  Jemima ----------------------------------------
function jemima() {
  canvas.addEventListener("mousedown", function(event) {
    mouseX = event.x / xScale;
    mouseY = event.y / yScale;
    if (mouseY > h / 2 && mouseX < w / 2) {
      localStorage.setItem("PSLo", "jemimaGame()")
    } else {
      localStorage.setItem("PSLo", "windows()")
    }
    location.reload();
  });

  ctx.fillStyle = pinkG
  ctx.fillRect(0, 0, w, h)
  ctx.fillStyle = "white"
  ctx.font = '140px Nunito';
  ctx.textAlign = 'left';
  ctx.fillText("Jemima's Rocket", 100, 200);
  ctx.font = '80px Nunito-Italic';
  ctx.fillText("Don't Hit the Asteriods!", 100, 340);
  ctx.font = '400px Nunito';
  ctx.fillText("\u25BA", 200, 850);
  ctx.drawImage(document.getElementById("Rocket"), 800, 300, 332 * 2.5, 239 * 2.5);
}

function jemimaGame() {


  canvas.addEventListener("mousemove", function(event) {
    mouseX = event.x / xScale;
    mouseY = event.y / yScale;
  });


  var angleHighScore = localStorage.getItem("angleHighScore")
  if (angleHighScore == null) {
    localStorage.setItem("angleHighScore", 0)
    angleHighScore = localStorage.getItem("angleHighScore")
  }
  ctx.globalCompositeOperation = "source-over";
  var alive = true;
  var density = 5;
  var speed = 100;
  var points = [];
  var time = 0;
  var size = 800;
  var fov = 250
  var animation = setInterval(drawpoints, 50) // 20 fps


  function point(x, y, z, s) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = s;
    this.o = 0;
    this.thetaU = (Math.random() - 0.5) * 0.1 //rotational velocity
    this.theta = Math.random() * 6; // Starting angle
  }
  //Add rotational velocity, and rotational displacement. for drawing !!!!!!!!!!

  function drawpoints() {
    speed += 0.5;
    density += 0.05;
    time += 0.063;
    size += 0.01;
    for (var i = 0; i < Math.floor(density); i++) {
      points.unshift(new point(Math.random() * (w * 20) - ((w / 2) * 20),
        Math.random() * (h * 20) - ((h / 2) * 20) - 1000,
        fov * 15, Math.floor(size)))
    }
    ctx.fillStyle = ctx.fillStyle = pinkG;
    ctx.fillRect(0, 0, w, h)
    var old = points.length - 1
    for (var i = 0; i < points.length; i++) {
      points[i].z -= Math.floor(speed);
      if (points.z < -fov) {
        points.z = -fov
      }
      points[i].x += (mouseX - (w / 2)) * (speed / fov) * -1;
      points[i].y += (mouseY - (h / 2)) * (speed / fov) * -1;
      draw(points[i]);

      if (points[i].z < -fov) {
        points.pop()
      }
    }

    if (alive) {
      ctx.fillStyle = "white"
      ctx.textBaseline = 'top';
      ctx.textAlign = 'left'
      ctx.font = '135px Nunito-Bold';
      ctx.fillText(Math.floor(time), 40, 0);
    } else {
      endScreen();
    }
  }

  function draw(p) {
    p.theta += p.thetaU
    var scale = fov / (p.z + fov);
    size1 = p.size * scale;
    if (p.o < 1) {
      p.o += speed / (fov * 3);
    }
    if (p.z > -fov) {
      //ctx.fillStyle = "rgba(255,255,255," + p.o.toString() + ")"
      //ctx.fillRect(p.x * scale + (w/2), p.y * scale + (h/2), size1, size1);
      ctx.globalAlpha = p.o
      ctx.save()
      ctx.translate(p.x * scale + (w / 2) - 10 + (size1 + 20) / 2, p.y * scale + (h / 2) - 10 + (size1 + 20) / 2)
      ctx.rotate(p.theta);
      ctx.drawImage(document.getElementById("Asteriod"), -(size1 + 20) / 2, -(size1 + 20) / 2, size1 + 20, size1 + 20)
      ctx.restore();
      ctx.globalAlpha = 1
    }
    size1 = p.size * fov / (p.z + fov);
    if (
      (0 > p.x) &&
      (0 < p.x + size) &&
      (0 > p.y) &&
      (0 < p.y + size) &&
      (p.z <= -fov)
    ) {
      alive = false;
    }
  }

  function endScreen() {
    clearInterval(animation)
    ctx.fillStyle = pinkG;
    ctx.fillRect(0, 0, w, h)
    if (Math.floor(time) > parseInt(angleHighScore)) {
      localStorage.setItem("angleHighScore", Math.floor(time))
    }
    ctx.textAlign = "center";
    ctx.fillStyle = "white"
    ctx.font = '140px Nunito-Bold';
    ctx.fillText("You're Dead.", w / 2, h * .2);
    ctx.font = '120px Nunito';
    ctx.fillText("Score  " + Math.round(time).toString(), w / 2, h * 0.43);
    ctx.fillText("Highscore  " + angleHighScore, w * 0.5, (h) * 0.6)
    ctx.font = '100px Nunito';
    ctx.fillText("\u21BB", w * .95, h * .85)
    ctx.fillText("\u2190", w * 0.05, h * .85)

    canvas.addEventListener("mousedown", function(event) {
      if (mouseY > h * .8) {
        if (mouseX < w * .1) {
          localStorage.setItem("PSLo", "windows()")
          location.reload();
        }
        if (mouseX > w * .9) {
          localStorage.setItem("PSLo", "jemimaGame()")
          location.reload();
        }
      }
    });
  }
}