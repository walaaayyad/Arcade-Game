"use strict";
/*
*----------------------------------------------------
                      Variables
*----------------------------------------------------
*/
let  heartO= document.getElementById('one'),
     heartT=document.getElementById('two'),
     heartTh=document.getElementById('three'),
     score= document.querySelector('.scoreNum'),
     scoreArray=[],
     lives=[],
     allEnemies = [],
     enemyLocation = [63,147,230];
 
    // Create variable for Enemy
//----------------------------------  
let  Enemy = function(x,y,speed) {
        this.x= x;
        this.y= y;
        this.speed= speed;
        this.sprite = 'images/enemy-bug.png';
};

    // Create variable for Player
//---------------------------------- 
let Player = function(x,y){
        this.x = x;
        this.y = y;
        this.playerImg = 'images/char-boy.png';
    }
let player = new Player(202,405);



    // Start Move The Enemies
//-----------------------------------
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if(this.x > 506){
        this.x -= 506;
        this.speed = 100 + Math.floor(Math.random() * 222);
    }
    
    // If Collision Happened
//------------------------------------
// In this case the lives array increase one live every collision & The hearts decreas until reach three lives,
// the game will over and start again.

    if(player.x < this.x + 80 &&
       player.x + 80 > this.x &&
       player.y < this.y + 60 &&
       player.y + 60 > this.y){

            player.x = 202;
            player.y = 405;

            lives.push('live');
            console.log(lives.length);
        }
        if(lives.length=== 1){
            heartO.classList.add('hide');
        }
         if(lives.length=== 2){
            heartT.classList.add('hide');
        }
         if(lives.length===3){
            heartTh.classList.add('hide');
            
        }
        if(heartTh.className.includes('hide')){
        msg();
        setTimeout(function(){
       location.reload();
   },2000)
}
       
    }
       
function msg(){
  swal({
    title: "Game Over !  ",
    button: false,
    timer: 3000,

  });
}


Enemy.prototype.render = function() {
 ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

enemyLocation.forEach(function(locationY){
    enemy = new Enemy(0,locationY,200);
    allEnemies.push(enemy);
});


Player.prototype.update = function(dt) {
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.playerImg), this.x, this.y);

};

   //  Player Movements on the screen
//-----------------------------------------

Player.prototype.handleInput = function(keyPress){
    if(keyPress == 'left' && this.x > 0){
        this.x -= 102;
    }
    if(keyPress == 'right' && this.x < 405){
        this.x += 102;
    }
    if(keyPress == 'up' && this.y > 0){
        this.y -= 83;
    }
    if(keyPress == 'down' && this.y < 405){
        this.y += 83;
    }
    if(this.y < 0){
        setTimeout(function(){
            this.x = 202;
            this.y = 405;
        }, 300);
     scor();
    }
}
   // Function to count the points
//-------------------------------------

function scor(){
     scoreArray.push(100);
     console.log(scoreArray);
 if(scoreArray.length=== 1){
     score.innerText =+ 100;
   }
   else if(scoreArray.length=== 2){
     score.innerText =+ (100*2);
   }
   else if(scoreArray.length=== 3){
     score.innerText =+ (100*3);
   }
   else if(scoreArray.length=== 4){
     score.innerText =+ (100*4);
   }
  else if(scoreArray.length=== 5){
     score.innerText =+ (100*5);
     swal({
    title: "Good job !  ",
    text: "Your Score 500",
    icon: "success",
    button: false,
    timer: 4000,

  });
       setTimeout(function(){
       location.reload();
   },4000)


   }
}


document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
