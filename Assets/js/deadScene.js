

class deadScene extends Phaser.Scene{
  constructor(){
    super("deadScene");
  }


  preload(){


    this.load.image('theEndBkg', 'Assets/images/TheEndBackground.png');
    this.load.spritesheet('theReplayButton', 'Assets/images/replay-button.png', {
      frameWidth: 200,
      frameHeight: 200
    })

    this.load.spritesheet("theEndWord", "Assets/images/TheEndWord.png", {
      frameWidth: 632,
      frameHeight: 137
    });    
  
  }
  
   async create(){

    
    this.celestialBody = this.add.tileSprite(960,540,config.width, config.height, 'theEndBkg');

    this.anims.create({
      key: "theEnd_anim",
      frames: this.anims.generateFrameNumbers("theEndWord"),
      frameRate: 4,
      repeat: -1
    });

    this.endWord = this.add.sprite(config.width/2, 150, 'theEndWord');
    this.endWord.play('theEnd_anim');

    this.replaybutton = this.add.sprite(config.width - 200, 150, 'theReplayButton').setInteractive();

    this.replaybutton.on('pointerdown', function (pointer) {
      playerDamage = 200;
      playerMaxHealth = 1000;
      playerHealth = 1000;
      playerSpeed = 300;
      handBossJumpTimer = Phaser.Math.Between(20, 100);
      handBossJumpCount = 0;
      levelMultiplier = 0;
      createEnemyTimer = 0;
      enemyTimerRandomizer = Phaser.Math.Between(4, 6);
      createPowerUpTimer = 0;
      PowerUpTimerRandomizer = Phaser.Math.Between (10, 20);
      score = 0
      this.scene.scene.scene.start('Level1');
  }, this);

    var graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.beginPath();
    graphics.moveTo(0,0);
    graphics.lineTo(400, 0);
    graphics.lineTo(400, config.height);
    graphics.lineTo(0, config.height);
    graphics.lineTo(0, 0);
    graphics.closePath();
    graphics.fillPath();

    var title1 = this.add.bitmapText(10, 5, "pixelFont", "YOUR FINAL SCORE", 60);
    var title3 = this.add.bitmapText(10, 100, "pixelFont", "--------------------", 50);
    var title4 = this.add.bitmapText(30, 175, "pixelFont", score, 50);

  }

  

  
  update(){
  }
}


function fetchScores() {
  return fetch(serverURL)
    .then(response => response.json())
}

async function updateMessages() {
  // Fetch Messages
  const fetchedScores = await fetchScores();
  // Loop over the messages. Inside the loop we will:
  // get each message
  // format it
  // add it to the chatbox
  let formattedScores = "";
  fetchedScores.forEach(savedScore => {
    formattedScores += fetchedScores.player + '                    ' + fetchedScores.score + '\r\n';
  });
  var resultsArea = this.add.bitmapText(10, 225, "pixelFont", resultList, 50);
}

// async function loadlist(){
//   var recordList = '';





  
//   $.ajax({
//     type: "GET",
//     url: "Assets/scores/scores.xml",
//     dataType: "xml",

//     error: function (e) {
//         alert("An error occurred while processing XML file");
//         console.log("XML reading Failed: ", e);
//     },

//   success: function (response) {
//     var items = [];
//     var sorteditems;
//     $(response).find("scorerecord").each(async function(){
//         var score = parseInt($(this).find('score').text());
//         var player = $(this).find('player').text();
//         var item={player:player, score:score};
//         items.push(item);

        
//       });

//       sorteditems = items.sort((a, b) => parseInt(b.score) - parseInt(a.score));
//       var records = '';
//       for(var item of sorteditems){
//         records += item.player + '                    ' + item.score + '\r\n';
//       }
//       document.getElementById("lblResults").innerHTML = records;
    
//   }
  
// }

//);

//}