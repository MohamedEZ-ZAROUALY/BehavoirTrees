
var myGamePiece;
var myObstacle;
var myObstacle2;
var myObstacle3;
var myObstacle4;
var finishLine ;
var food =   new Set();
var score = 0 ;

function startGame() {
    myGamePiece = new component(20, 20, "red", 20, 20);
    for (var i = 0; i < 7; i++) {
    food.add( new component(20, 20, "blue", Math.floor(Math.random() * (28) )*20 +40,
     Math.floor(Math.random() * (18) )*20 +40)) ;
    }
    myObstacle = new component(20, 400, "green", 580,0 );
    myObstacle2 = new component(580, 20, "green", 0,0 );
    myObstacle3 = new component(20, 380, "green", 0,20);
    myObstacle4 = new component(560, 20, "green", 20,380 );
    finishLine = new component(20, 20, "black", 20,360 );
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 600;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea,10);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
      }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;  
    this.direction  = "Right"   ;   
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    } 
    this.crashWithOb = function() {
        var myleft = this.x;
        var myright = this.x + 20;
        var mytop = this.y ;
        if (myright == 580  ) {
            this.direction = "Left";
            myGamePiece.y += 20; 
        }else if ( myleft == 20) {
            this.direction = "Right";
            myGamePiece.y += 20; 
          }
    
         }
}

function updateGameArea() {
    if (myGamePiece.x <= 40 && myGamePiece.y == 360) {
        myGameArea.stop();
        document.getElementById("score").innerHTML = "Score: " + score 
                + "   x :" + myGamePiece.x + "   y :" + myGamePiece.y;
      } else {
        myGameArea.clear();
        finishLine.update();
        food.forEach(function(foodie) 
        { foodie.update(); });

        myObstacle.update();
        myObstacle2.update();
        myObstacle3.update();
        myObstacle4.update();

        if (myGamePiece.direction == "Right") {
            myGamePiece.x += 20; 
        }
        else if (myGamePiece.direction == "Left") {
            myGamePiece.x -= 20; 
        }
        myGamePiece.crashWithOb();

        food.forEach(function(foodie) 
        {
            if (myGamePiece.x == foodie.x && myGamePiece.y == foodie.y ) {
                food.delete(foodie);
                score++;
                document.getElementById("score").innerHTML = "Score: " + score 
                + "   x :" + myGamePiece.x + "   y :" + myGamePiece.y;
            }
         });
        myGamePiece.update();
      }
}



function moveup() {
    myGamePiece.y -= 20; 
}

function movedown() {
    myGamePiece.y += 20; 
}

function moveleft() {
    myGamePiece.x -= 20; 
}

function moveright() {
    myGamePiece.x += 20; 
}

