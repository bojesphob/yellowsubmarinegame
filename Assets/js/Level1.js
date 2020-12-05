//create global variables
var createEnemyTimer = 0;
var enemyTimerRandomizer = Phaser.Math.Between(4, 6);
var createPowerUpTimer = 0;
var PowerUpTimerRandomizer = Phaser.Math.Between (10, 15);
var score = 0;
var playerDamage = 200;
var playerSpeed = 300;
var playerHealth = 1000;
var playerMaxHealth = 1000;
var bossHealth = 0;
var bossMaxHealth = 0;
var handBossJumpTimer = Phaser.Math.Between(20, 100);
var handBossJumpCount = 0;
var levelMultiplier = 0;
      

class Level1 extends Phaser.Scene{
  constructor(){
    super("Level1");
  }

  preload(){
    
    //load background land and sky
    this.load.image('skynight', 'Assets/images/LoveUpper-night.png');
    this.load.image('skyday', 'Assets/images/LoveUpper.png');

    this.load.image('cloud1', 'Assets/images/cloud1.png');
    this.load.image('cloud2', 'Assets/images/cloud2.png');
    this.load.image('cloud3', 'Assets/images/cloud3.png');
    

    //load submarine and repeatable stuff
    loadReusedSprites(this, null, null);

    //load enemy 1 spritesheet
    this.load.spritesheet("Enemy1", "Assets/images/bluemeaniesprite.png", {
      frameWidth: 224,
      frameHeight: 175,
    });

    // load enemy1Projectile spritesheet
    this.load.spritesheet("enemy1Projectile", "Assets/images/arrowsprite.png", {
      frameWidth:135,
      frameHeight:26
    });

    //load pixelfont
    this.load.bitmapFont("pixelFont", "Assets/font/font.png", "Assets/font/font.xml");
    
  }
  create(){
    createSprites(this);
    //create enemy 1 animation
    this.anims.create({
      key:"Enemy1_anim",
      frames: this.anims.generateFrameNumbers("Enemy1"),
      frameRate:1,
      repeat:-1
    });

    //create enemy1Projectile animation
    this.anims.create({
      key:"enemy1Projectile_anim",
      frames: this.anims.generateFrameNumbers("enemy1Projectile"),
      frameRate:20,
      repeat:-1
    });

    //Run Load Weather function
    loadWeather(this, 'skyday', 'skynight', false, null);
 
    this.cloudImage1 = this.add.sprite(config.width + 250, config.height/2 + 200, "cloud1");
    this.cloudImage2 = this.add.sprite(config.width + 250, config.height/2, "cloud2");
    this.cloudImage3 = this.add.sprite(config.width + 250, config.height/2 - 200, "cloud3");

    this.clouds = this.physics.add.group();

    this.clouds.add(this.cloudImage1);
    this.clouds.add(this.cloudImage2);
    this.clouds.add(this.cloudImage2);

    //this.groundTile = this.add.tileSprite(960,540,config.width, config.height, "land");

    //create a projectiles group
    this.projectiles = this.add.group();

    //create enemies group
    this.enemies = this.add.group();

    //create enemy1projectile group
    this.enemyProjectiles = this.add.group();

    //create powerup groups
    this.PowerUps1 = this.add.group();
    this.PowerUps2 = this.add.group();
    this.PowerUps3 = this.add.group();

    //enemy and projectile overlap
    this.physics.add.overlap(this.projectiles, this.enemies, this.hurtEnemy, null, this);

    //enemy and player overlap
    this.physics.add.overlap(this.submarine, this.enemies, this.crashDamage, null, this);

    //enemy projectile and player overlap
    this.physics.add.overlap(this.submarine, this.enemyProjectiles, this.playerHit, null, this);

    //player collision with power ups
    this.physics.add.overlap(this.submarine, this.PowerUps1, this.HealthUp, null, this);
    this.physics.add.overlap(this.submarine, this.PowerUps2, this.DamageUp, null, this);
    this.physics.add.overlap(this.submarine, this.PowerUps3, this.SpeedUp, null, this);

    levelMultiplier = 1;

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

  }

  update ()
  { 
    //moves background sky and ground
    this.skyTile.tilePositionX +=1.0;

    //shoot projectile
    if(Phaser.Input.Keyboard.JustDown(this.shoot)){
        shootSubmarineProjectile(this);
    }
    
    //create enemy
    this.checkCreateEnemyTimer(enemyTimerRandomizer);
    this.checkCreatePowerUpTimer(PowerUpTimerRandomizer);

    //Checks for player movement
    movePlayerManager(this, this.submarine);

    //iterate through each element of projectile group
    for(var i = 0; i < this.projectiles.getChildren().length; i++){
      var SubmarineProjectile = this.projectiles.getChildren()[i];
      SubmarineProjectile.update();
    }

    //iterate through each element of enemyprojectile group
    for(var i = 0; i < this.enemyProjectiles.getChildren().length; i++){
      var EnemyProjectile = this.enemyProjectiles.getChildren()[i];
      EnemyProjectile.update();
    }

    //iterate through each element of enemies group
    for(var i = 0; i < this.enemies.getChildren().length; i++){
      var Enemy = this.enemies.getChildren()[i];
      Enemy.update(); 
      if(Enemy.update()%240 ==0){
        if(Enemy.projectileNumber < 1){
          var littleEnemyProjectile = new enemyProjectile(this, Enemy.x, Enemy.y, 1);
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
    
    //check for level 1 complete
    checkWinLevel(this, 200, 3000, 3000, 'Level1Boss');

    //move clouds across screen
    this.moveCloud(this.cloudImage1);
    if(this.cloudImage1.x < (config.width * 0.75) || this.cloudImage2.x < config.width){
      this.moveCloud(this.cloudImage2);
    }
    if(this.cloudImage2.x < (config.width * 0.75) || this.cloudImage3.x < config.width){
      this.moveCloud(this.cloudImage3);
    }
    
    
  }



  //move cloud
  moveCloud(cloudToMove){
    cloudToMove.x -= 5;
    if(cloudToMove.x < 0)
    {
      this.resetCloud(cloudToMove);
    }
  }
  // reset cloud
  resetCloud(cloudToMove){
    cloudToMove.x = config.width + 250;
    var randomY = Phaser.Math.Between(200, config.height);
    cloudToMove.y = randomY;
    var randomForLayer = Phaser.Math.Between(0, config.height)
    if(randomForLayer < config.height / 2)
    {
      cloudToMove.setDepth(10);
    }else{
      cloudToMove.setDepth(0);
    }
  }

  checkCreatePowerUpTimer(time){
    if(createPowerUpTimer > time){
      createPowerUpTimer = 0;
      PowerUpTimerRandomizer = Phaser.Math.Between(20, 40);
      createPowerUp(this);
    }
    else{
      createPowerUpTimer += 1/60;
    }
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
  
  createEnemies(){
    //var enemyNumber = 0.75;
    var Enemy = new Enemies(this, 0.75, levelMultiplier);
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

  playerHit(submarine, enemyProjectiles){
    playerHealth -=25;
    this.playerHealthLabel.text = "PlayerHealth: " + playerHealth + "/" + playerMaxHealth;
    enemyProjectiles.destroy();
    if(playerHealth <= 0){
      var submarineExplosion = new playerExplosionClass(this, submarine.x, submarine.y);
      this.scene.start('deadScene', {transferScore: score});
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
}
