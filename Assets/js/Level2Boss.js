class Level2Boss extends Phaser.Scene{
  constructor(){
    super("Level2Boss");

  }

  preload(){

    loadReusedSprites(this, null, null);

    //load fish boss spritesheet
    this.load.spritesheet("fishBoss", "Assets/images/fishboss.png", {
      frameWidth: 1394,
      frameHeight: 655
    });

    //load bossExplosion spritesheet
    this.load.spritesheet("bossExplosion", "Assets/images/BossExplosion.png", {
      frameWidth: 418,
      frameHeight: 354
    });

    // load fish boss Projectile spritesheet
    this.load.spritesheet("fishBossProjectile", "Assets/images/FishBossProjectile.png", {
      frameWidth:200,
      frameHeight:60.5
    });

  }


  create(){
    this.bossAttackTimer = 0;


    //create fish boss animation
    this.anims.create({
      key: "fishBoss_anim",
      frames: this.anims.generateFrameNumbers("fishBoss"),
      frameRate: 2,
      repeat: -1
    });


    //create fish boss explosion animation
    this.anims.create({
      key: "bossExplosion_anim",
      frames: this.anims.generateFrameNumbers("bossExplosion"),
      frameRate: 10,
      repeat: -1
    });

    //create fish boss projectile animation
    this.anims.create({
      key:"fishBossProjectile_anim",
      frames: this.anims.generateFrameNumbers("fishBossProjectile"),
      frameRate:20,
      repeat:-1
    });    

    createSprites(this);
    
    loadWeather(this, 'waterDay', 'waterNight', null, false);
     
    
    //create fish boss
    this.fishBoss = this.physics.add.sprite(config.width -250, config.height - 150, "fishBoss");

    //play fish boss animation
    this.fishBoss.play("fishBoss_anim");

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

    //boss health graphics
    this.bossHPGraphics = this.add.graphics();
    this.bossHPGraphics.fillStyle(0x000000, 1);
    this.bossHPGraphics.beginPath();
    this.bossHPGraphics.moveTo(1600, 775);
    this.bossHPGraphics.lineTo(1850, 775);
    this.bossHPGraphics.lineTo(1850, 825);
    this.bossHPGraphics.lineTo(1600, 825);
    this.bossHPGraphics.lineTo(1600, 775);
    this.bossHPGraphics.closePath();
    this.bossHPGraphics.fillPath();
    this.bossHPLabel = this.add.bitmapText(1610, 780, "pixelFont", "HP:" + bossHealth + "/" + bossMaxHealth, 50);

    this.physics.world.enableBody(this.bossHPGraphics);
    this.physics.world.enableBody(this.bossHPLabel);
    //create a projectiles group
    this.projectiles = this.add.group();  
    
    //create boss projectile group
    this.bossProjectiles = this.add.group();

    //enemy and projectile overlap
    this.physics.add.overlap(this.projectiles, this.fishBoss, this.hurtBoss, null, this);

    //enemy and player overlap
    this.physics.add.overlap(this.submarine, this.fishBoss, this.crashDamage, null, this);

    //enemy projectile and player overlap
    this.physics.add.overlap(this.submarine, this.bossProjectiles, this.playerHit, null, this);


  }

  update(){
    //moves background sky and ground
    this.skyTile.tilePositionX +=1.0;

    //shoot projectile
    if(Phaser.Input.Keyboard.JustDown(this.shoot)){
        shootSubmarineProjectile(this);
    }

    //Checks for player movement
    movePlayerManager(this, this.submarine);

    //iterate through each element of projectile group
    for(var i = 0; i < this.projectiles.getChildren().length; i++){
      var SubmarineProjectile = this.projectiles.getChildren()[i];
      SubmarineProjectile.update();
    }

    for(var i = 0; i < this.bossProjectiles.getChildren().length; i++){
      var bossProjectile = this.bossProjectiles.getChildren()[i];
      bossProjectile.update();
    }

    //check boss jump timer
    this.checkBossJumpTimer(this.fishBoss, this.bossHPLabel, this.bossHPGraphics);

    //check boss attack timer
    this.checkBossAttackTimer();

  }

  //boss attack timer
  checkBossAttackTimer(){
    if(this.bossAttackTimer > 180){
      var bossProjectileStraight = new fishBossProjectile(this, this.fishBoss.x - 300, this.fishBoss.y - 20);
      var bossProjectileUp = new fishBossProjectile(this, this.fishBoss.x - 300, this.fishBoss.y - 20);
      var bossProjectileDown = new fishBossProjectile(this, this.fishBoss.x - 300, this.fishBoss.y - 20);
      bossProjectileDown.body.velocity.y =150;
      bossProjectileUp.body.velocity.y = -150;
      this.bossAttackTimer = 0;
    }
    else{
      this.bossAttackTimer++;
    }

  }

  //boss Jump timer
  checkBossJumpTimer(fishboss, hplabel, hpgraphics){
    if(fishboss == null){
      return;
    }
    if(handBossJumpCount >= handBossJumpTimer){
      handBossJumpCount =0;
      if(fishboss.body.velocity.y == 0){
        fishboss.body.velocity.y -= 400;
        hplabel.body.velocity.y -= 400;
        hpgraphics.body.velocity.y -= 400;
      }
      else if(fishboss.body.velocity.y == 400){
        fishboss.body.velocity.y -= 400;
        hplabel.body.velocity.y -= 400;
        hpgraphics.body.velocity.y -= 400;
        handBossJumpTimer = Phaser.Math.Between(20, 100);
      }
      else{
        fishboss.body.velocity.y += 800;
        hplabel.body.velocity.y += 800;
        hpgraphics.body.velocity.y += 800;
      }
    }
    else{handBossJumpCount++}
  }

   //shoot submarine projectile
   shootSubmarineProjectile(){
    var SubmarineProjectile = new SubmarineProjectiles(this);
  }

  //projectile & enemy collision
  hurtBoss(projectiles, fishBoss) {
    bossHealth -= playerDamage;
    projectiles.destroy();
    this.bossHPLabel.text = "HP:" + bossHealth + "/" + bossMaxHealth;
    if (bossHealth<= 0){
      score += bossMaxHealth;
      fishBoss.destroy();
      this.scene.start('Level3');
    }
  }

  //player hit by enemy projectile
  playerHit(submarine, bossProjectiles){
    playerHealth -=500;
    this.playerHealthLabel.text = "PlayerHealth: " + playerHealth + "/" + playerMaxHealth;
    bossProjectiles.destroy();
    if(playerHealth <= 0){
      var submarineExplosion = new playerExplosionClass(this, submarine.x, submarine.y);
      this.scene.start('deadScene', {transferScore: score});
    }
  }

  //player hit boss
  crashDamage(submarine, fishBoss){
    playerHealth -= fishBoss.health;
    this.playerHealthLabel.text =  "PlayerHealth: " + playerHealth + "/" + playerMaxHealth;
    if (playerHealth <= 0){
      var submarineExplosion = new playerExplosionClass(this, submarine.x, submarine.y);
      this.scene.start('deadScene', {transferScore: score});
    }
  }

}