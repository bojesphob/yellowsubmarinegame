class Level3 extends Phaser.Scene{
  constructor(){
    super("Level3");
  }

  preload(){
    
    loadReusedSprites(this, 'Level3', true);
    //load background land and sky
    this.load.image('flowersNight', 'Assets/images/flowersNight.png');
    this.load.image('flowersDay', 'Assets/images/flowersDay.png');    


    //load enemy 5 spritesheet
    this.load.spritesheet("Enemy5", "Assets/images/Enemy5.png", {
      frameWidth: 421.5,
      frameHeight: 250,
    });


    //load smallEnemyExplosion spritesheet
    this.load.spritesheet("smallEnemyExplosion", "Assets/images/smallEnemyExplosion.png", {
      frameWidth: 418,
      frameHeight: 354
    });

    
  }




  create(){
    createSprites(this);
  
    //create enemy 5 animation
    this.anims.create({
      key:"Enemy5_anim",
      frames: this.anims.generateFrameNumbers("Enemy5"),
      frameRate:1,
      repeat:-1
    });

    //create small enemy explosion anim
    this.anims.create({
      key: "smallEnemyExplosion_anim",
      frames: this.anims.generateFrameNumbers("smallEnemyExplosion"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    });

    loadWeather(this, 'flowersDay', 'flowersNight', 'Level3', true);

    //Score graphics
    var graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.beginPath();
    graphics.moveTo(0,0);
    graphics.lineTo(config.width, 0);
    graphics.lineTo(config.width, 80);
    graphics.lineTo(0, 80);
    graphics.lineTo(0, 0);
    graphics.closePath();
    graphics.fillPath();

    // add top label
    this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE: " + score, 50);
    this.playerHealthLabel = this.add.bitmapText(600, 5, "pixelFont", "PlayerHealth: " + playerHealth + "/" + playerMaxHealth, 50)
    this.speedLabel = this.add.bitmapText(1100, 5, "pixelFont", "PlayerSpeed: " + playerSpeed, 50);
    this.damageLabel = this.add.bitmapText(1500, 5, "pixelFont", "PlayerDamage: " + playerDamage, 50);

    //create a projectiles group
    this.projectiles = this.add.group();

    //create enemies group
    this.enemies = this.add.group();

    //create powerup groups
    this.PowerUps1 = this.add.group();
    this.PowerUps2 = this.add.group();
    this.PowerUps3 = this.add.group();

    //enemy and projectile overlap
    this.physics.add.overlap(this.projectiles, this.enemies, this.hurtEnemy, null, this);

    //enemy and player overlap
    this.physics.add.overlap(this.submarine, this.enemies, this.crashDamage, null, this);

    //player collision with power ups
    this.physics.add.overlap(this.submarine, this.PowerUps1, this.HealthUp, null, this);
    this.physics.add.overlap(this.submarine, this.PowerUps2, this.DamageUp, null, this);
    this.physics.add.overlap(this.submarine, this.PowerUps3, this.SpeedUp, null, this);

    levelMultiplier = 3;
  }


  update ()
  { 
    //moves background sky and ground
    this.skyTile.tilePositionX +=1.0;
    this.ground.tilePositionX += 1.0;

    //shoot projectile
    if(Phaser.Input.Keyboard.JustDown(this.shoot)){
        shootSubmarineProjectile(this);
    }
    
    //create enemy
    this.checkCreateEnemyTimer(enemyTimerRandomizer);

    //create powerups
    this.checkCreatePowerUpTimer(PowerUpTimerRandomizer);

    //Checks for player movement
    movePlayerManager(this, this.submarine);

    //iterate through each element of projectile group
    for(var i = 0; i < this.projectiles.getChildren().length; i++){
      var SubmarineProjectile = this.projectiles.getChildren()[i];
      SubmarineProjectile.update();
    }

    //iterate through each element of enemies group
    for(var i = 0; i < this.enemies.getChildren().length; i++){
      var Enemy = this.enemies.getChildren()[i];
      Enemy.update(); 
      if(Enemy.update()%240 ==0){
        if(Enemy.projectileNumber < 1){
          var littleEnemyProjectile = new enemyProjectile(this, Enemy.x, Enemy.y, 1);
        }
        if(Enemy.projectileNumber >=1 && Enemy.projectileNumber <= 4){
          var straightProjectile = new enemyProjectile(this, Enemy.x, Enemy.y, 2);
          var upProjectile = new enemyProjectile(this, Enemy.x, Enemy.y, 3);
          var downProjectile = new enemyProjectile(this, Enemy.x, Enemy.y, 4);
        }
        if(Enemy.projectileNumber > 4 && Enemy.projectileNumber <=5){
          Enemy.body.velocity.x *=2;
        }
      }  
    }

    //iterate through PowerUps1 group
    for(var i = 0; i < this.PowerUps1.getChildren().length; i++){
      var thisPowerUp1 = this.PowerUps1.getChildren()[i];
      thisPowerUp1.update();
    }
    //iterate through PowerUps2 group
    for(var i = 0; i < this.PowerUps2.getChildren().length; i++){
      var thisPowerUp2 = this.PowerUps2.getChildren()[i];
      thisPowerUp2.update();
    }
    //iterate through PowerUps3 group
    for(var i = 0; i < this.PowerUps3.getChildren().length; i++){
      var thisPowerUp3 = this.PowerUps3.getChildren()[i];
      thisPowerUp3.update();
    }
    
    //check for level 3 complete
    checkWinLevel(this, 15000, 20000, 20000, 'Level3Boss');
  
  }

  
  //createEnemyTimer check
  checkCreateEnemyTimer(time){
    if(createEnemyTimer > time){
      createEnemyTimer = 0;
      enemyTimerRandomizer = Phaser.Math.Between(4, 6);
      this.createEnemies();
    }
    else{
      createEnemyTimer += 1/60;
    }
  }

  checkCreatePowerUpTimer(time){
    if(createPowerUpTimer > time){
      createPowerUpTimer = 0;
      PowerUpTimerRandomizer = Phaser.Math.Between(20,40);
      this.createPowerUp();
    }
    else{
      createPowerUpTimer += 1/60;
    }
  }
  
  createEnemies(){
    var enemyNumber = 5;
    var Enemy = new Enemies(this, enemyNumber, levelMultiplier);
  }

  createPowerUp(){
    var PowerUpNumber = Phaser.Math.Between(1, 100);
    var PlayerPowerUp = new PowerUp(this, PowerUpNumber);
    
  }

  //projectile & enemy collision
  hurtEnemy(projectiles, enemies) {
    enemies.health -= playerDamage;
    projectiles.destroy();
    if (enemies.health <= 0){
      score += enemies.starthealth;
      this.scoreLabel.text = "SCORE " + score;
      enemies.destroy();
      var smallEnemyExplosion = new smallEnemyExplosionClass(this, enemies.x, enemies.y);
      projectiles.destroy();
    }
  }

  crashDamage(submarine, enemies){
    playerHealth -= enemies.health;
    this.playerHealthLabel.text =  "PlayerHealth: " + playerHealth + "/" + playerMaxHealth;
    enemies.destroy();
    var smallEnemyExplosion = new smallEnemyExplosionClass(this, enemies.x, enemies.y);
    if (playerHealth <= 0){
      var submarineExplosion = new playerExplosionClass(this, submarine.x, submarine.y);
      this.scene.start('deadScene', {transferScore: score});
    }
  }

  //collisions with power ups
  HealthUp(submarine, powerup1){
    if (playerHealth < playerMaxHealth - 150){
      playerHealth += 200;
      playerMaxHealth +=50;
      this.playerHealthLabel.text =  "PlayerHealth: " + playerHealth + "/" + playerMaxHealth;
      powerup1.destroy();
    }
    else {
      var healthDifference = playerMaxHealth - playerHealth;
      playerMaxHealth +=50;
      playerHealth += (healthDifference + 50);
      this.playerHealthLabel.text =  "PlayerHealth: " + playerHealth + "/" + playerMaxHealth;
      powerup1.destroy();
    }
  }

  DamageUp(submarine, powerup2){
    playerDamage +=50;
    this.damageLabel.text = "PlayerDamage: " + playerDamage;
    powerup2.destroy();
  }

  SpeedUp(submarine, powerup3){
    playerSpeed += 100;
    this.speedLabel.text = "PlayerSpeed: " + playerSpeed;
    powerup3.destroy();
  }
 

}