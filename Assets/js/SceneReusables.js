function loadReusedSprites(scene, sceneName, includeForeground){
        //load submarine spritesheet
        scene.load.spritesheet("yellowsubmarine", "Assets/images/YellowSubmarine.png", {
            frameWidth: 328,
            frameHeight: 144
        });
          // load submarine projectile spritesheet
        scene.load.spritesheet("SubmarineProjectile", "Assets/images/SubmarineProjectile.png", {
            frameWidth:50,
            frameHeight:46
        });
        //load playerExplosion spritesheet
        scene.load.spritesheet("playerExplosion", "Assets/images/explosionsmall.png", {
            frameWidth: 350,
            frameHeight: 296.5
        });
        //load smallEnemyExplosion spritesheet
        scene.load.spritesheet("smallEnemyExplosion", "Assets/images/smallEnemyExplosion.png", {
            frameWidth: 418,
            frameHeight: 354
        });
        //load powerup images
        scene.load.image('PowerUp1', 'Assets/images/PowerUp1.png');
        scene.load.image('PowerUp2', 'Assets/images/PowerUp2.png');
        scene.load.image('PowerUp3', 'Assets/images/PowerUp3.png');
        scene.load.image('sunclear', 'Assets/images/day-layer.png');
        scene.load.image('suncloudy', 'Assets/images/day-layer-cloudy.png');
        scene.load.image('moonclear', 'Assets/images/night-layer.png');
        scene.load.image('mooncloudy', 'Assets/images/night-layer-cloudy.png');

        //load pixelfont
        scene.load.bitmapFont("pixelFont", "Assets/font/font.png", "Assets/font/font.xml");
        if(includeForeground == true){
            if(sceneName == 'Level1Boss'){
                scene.load.image('lovelower', 'Assets/images/LoveLower.png');
            } else if (sceneName == 'Level3' || sceneName == 'Level3Boss') {
                scene.load.image('flowerFore', 'Assets/images/flowersbackgroundFore.png');
            }else if(sceneName == 'Level4') {
                scene.load.image('foodFore', 'Assets/images/Foodoverlay.png')
            }
        }
}

function createSprites(scene){
        //create submarine animation
        scene.anims.create({
            key: "submarine",
            frames: scene.anims.generateFrameNumbers("yellowsubmarine"),
            frameRate: 3,
            repeat: -1
        });
        //create submarine projectile animation
        scene.anims.create({
            key:"SubmarineProjectile_anim",
            frames: scene.anims.generateFrameNumbers("SubmarineProjectile"),
            frameRate:20,
            repeat:-1
        });

        //create player explosion anim
        scene.anims.create({
            key: "playerExplosion_anim",
            frames: scene.anims.generateFrameNumbers("playerExplosion"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
        });

        //create small enemy explosion anim
        scene.anims.create({
            key: "smallEnemyExplosion_anim",
            frames: scene.anims.generateFrameNumbers("smallEnemyExplosion"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
        });

        

        //create the submarine
        scene.submarine = scene.physics.add.sprite(config.width / 2 - 600, config.height/ 3, "yellowsubmarine");
       
        //play submarine animation
        scene.submarine.play("submarine");

        //set world bounds on submarine
        scene.submarine.setCollideWorldBounds(true);

        //set world bounds
        scene.physics.world.setBoundsCollision();

        //add keys
        scene.shoot = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        scene.leftKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        scene.rightKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        scene.upKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        scene.downKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        //set depth of submarine
        scene.submarine.setDepth(5);
}

function loadWeather(scene, dayImage, nightImage, sceneName, includeForeground){
    //create background sky and ground
    if(currentWeather != 'Clear' && currentWeather != ''){
        currentWeather = 'Cloudy';
    } else {
    currentWeather = 'Clear';
    }
    var currentDate = new Date();
    var currentHour = currentDate.getHours();
    if(currentHour >= 6 && currentHour <= 19) {
        scene.skyTile = scene.add.tileSprite(960,540,config.width, config.height, dayImage);
        if(currentWeather == 'Clear'){
            scene.celestialBody = scene.add.tileSprite(960,540,config.width, config.height, 'sunclear');
        } else{
            scene.celestialBody = scene.add.tileSprite(960,540,config.width, config.height, 'suncloudy');
        }
    } else {
        scene.skyTile = scene.add.tileSprite(960,540,config.width, config.height, nightImage);
        if(currentWeather == 'Clear'){
            scene.celestialBody = scene.add.tileSprite(960,540,config.width, config.height, 'moonclear');
        } else{
            scene.celestialBody = scene.add.tileSprite(960,540,config.width, config.height, 'mooncloudy');
        }
    }
    if(includeForeground == true){
        if(sceneName == 'Level1Boss'){
            scene.ground = scene.add.tileSprite(960,540,config.width, config.height, 'lovelower');
        }else if(sceneName =='Level3' || sceneName == 'Level3Boss'){
            scene.ground = scene.add.tileSprite(960, 540, config.width, config.height, 'flowerFore');
        } else if (sceneName == 'Level4') {
            scene.ground = scene.add.tileSprite(960, 540, config.width, config.height, 'foodFore');
            scene.ground.setDepth(100);
        }
    }
}
function createPowerUp(scene){
    var PowerUpNumber = Phaser.Math.Between(1, 100);
    var PlayerPowerUp = new PowerUp(scene, PowerUpNumber);
    //var PlayerPowerUp = new PowerUp(this, 25);
  }

 function shootSubmarineProjectile(scene){
    var SubmarineProjectile = new SubmarineProjectiles(scene);
  }

  function movePlayerManager(scene, playerSubmarine){
    //move left
    if(scene.leftKey.isDown && !scene.rightKey.isDown && !scene.upKey.isDown && !scene.downKey.isDown){
        playerSubmarine.body.velocity.x = -playerSpeed;
        playerSubmarine.body.velocity.y=0;
    }
    //move right
    else if(!scene.leftKey.isDown && scene.rightKey.isDown && !scene.upKey.isDown && !scene.downKey.isDown){
        playerSubmarine.body.velocity.x = playerSpeed;
        playerSubmarine.body.velocity.y=0;
    }
    //move up
    else if (!scene.leftKey.isDown && !scene.rightKey.isDown && scene.upKey.isDown && !scene.downKey.isDown){
        playerSubmarine.body.velocity.y = -playerSpeed;
        playerSubmarine.body.velocity.x = 0;
    }
    //move down
    else if (!scene.leftKey.isDown && !scene.rightKey.isDown && !scene.upKey.isDown && scene.downKey.isDown){
        playerSubmarine.body.velocity.y = playerSpeed;
        playerSubmarine.body.velocity.x = 0;
    }
    //move up left
    else if(scene.leftKey.isDown && !scene.rightKey.isDown && scene.upKey.isDown && !scene.downKey.isDown){
        playerSubmarine.body.velocity.x = -playerSpeed;
        playerSubmarine.body.velocity.y = -playerSpeed;
    }
    //move up right
    else if(!scene.leftKey.isDown && scene.rightKey.isDown && scene.upKey.isDown && !scene.downKey.isDown){
        playerSubmarine.body.velocity.x = playerSpeed;
        playerSubmarine.body.velocity.y = -playerSpeed;
    }
    //move down left
    else if (scene.leftKey.isDown && !scene.rightKey.isDown && !scene.upKey.isDown && scene.downKey.isDown){
        playerSubmarine.body.velocity.y = playerSpeed;
        playerSubmarine.body.velocity.x = -playerSpeed;
    }
    //move down right
    else if (!scene.leftKey.isDown && scene.rightKey.isDown && !scene.upKey.isDown && scene.downKey.isDown){
        playerSubmarine.body.velocity.y = playerSpeed;
        playerSubmarine.body.velocity.x = playerSpeed;
    }
    //stop moving
    else{
        playerSubmarine.body.velocity.x = 0;
        playerSubmarine.body.velocity.y=0;
    }

  }

  function checkWinLevel(currentScene, maxScore, newBossHealth, newBossMaxHealth, newScene){
    if (score >= maxScore){
      bossHealth = newBossHealth;
      bossMaxHealth = newBossMaxHealth;
      currentScene.scene.start(newScene);
    }
  }
  