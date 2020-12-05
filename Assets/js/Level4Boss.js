class Level4Boss extends Phaser.Scene{
  constructor(){
    super("Level4Boss");

  }
  preload(){
    //load background land and sky
    this.load.image('linesNight', 'Assets/images/Lines-night-bkg.png');
    this.load.image('linesDay', 'Assets/images/LinesBackground.png');
    
    //load piano boss spritesheet
    this.load.spritesheet("PianoBoss", "Assets/images/PianoBoss.png", {
      frameWidth: 319,
      frameHeight: 500
    });

    //load bossExplosion spritesheet
    this.load.spritesheet("bossExplosion", "Assets/images/BossExplosion.png", {
      frameWidth: 418,
      frameHeight: 354
    });

    // load piano boss Projectile spritesheet
    this.load.spritesheet("PianoBossProjectile", "Assets/images/NoteProjectile.png", {
      frameWidth:80,
      frameHeight:87.5
    });

    //load noteExplosion spritesheet
    this.load.spritesheet("noteExplosion", "Assets/images/smallEnemyExplosion.png", {
      frameWidth: 418,
      frameHeight: 354
    });

  }




  create(){
    this.bossAttackTimer = 0;


    //create piano boss animation
    this.anims.create({
      key: "PianoBoss_anim",
      frames: this.anims.generateFrameNumbers("PianoBoss"),
      frameRate: 2,
      repeat: -1
    });

    //create piano boss explosion animation
    this.anims.create({
      key: "bossExplosion_anim",
      frames: this.anims.generateFrameNumbers("bossExplosion"),
      frameRate: 10,
      repeat: -1
    });

    //create piano boss projectile animation
    this.anims.create({
      key:"PianoBossProjectile_anim",
      frames: this.anims.generateFrameNumbers("PianoBossProjectile"),
      frameRate:1,
      repeat:-1
    });    

    //create note explosion anim
    this.anims.create({
      key: "noteExplosion_anim",
      frames: this.anims.generateFrameNumbers("noteExplosion"),
      frameRate: 20,
      repeat: -1,
      hideOnComplete: true
    });

    createSprites(this);
    
    loadWeather(this, 'linesDay', 'linesNight', null, false);
     
    //create piano boss
    this.PianoBoss = this.physics.add.sprite(config.width -250, config.height - 220, "PianoBoss");

    //play piano boss animation
    this.PianoBoss.play("PianoBoss_anim");
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

    //create note explosion group
    this.noteExplosions = this.add.group();

    //enemy and projectile overlap
    this.physics.add.overlap(this.projectiles, this.PianoBoss, this.hurtBoss, null, this);

    //enemy and player overlap
    this.physics.add.overlap(this.submarine, this.PianoBoss, this.crashDamage, null, this);

    //note explosions and player overlap
    this.physics.add.overlap(this.submarine, this.noteExplosions, this.playerHit, null, this);

  }

  update(){

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
    
    //iterate through boss projectile group
    for(var i = 0; i < this.bossProjectiles.getChildren().length; i++){
      var bossProjectile = this.bossProjectiles.getChildren()[i];
      bossProjectile.update();
      if (bossProjectile.updateTimer >= 180){
        var NoteExplosion = new PianoProjectileExplosions(this, bossProjectile.x, bossProjectile.y);
        bossProjectile.destroy();
      }
    } 
    //iterate through note explosion group?
    for(var i = 0; i < this.noteExplosions.getChildren().length; i++){
      var ExplosionDestroy = this.noteExplosions.getChildren()[i];
      ExplosionDestroy.update();
      if(ExplosionDestroy.timer >=40){
      ExplosionDestroy.destroy();
      }
    }
    //check boss jump timer
    this.checkBossJumpTimer(this.PianoBoss, this.bossHPLabel, this.bossHPGraphics);

    //check boss attack timer
    this.checkBossAttackTimer();

  }

  //boss attack timer
  checkBossAttackTimer(){
    if(this.bossAttackTimer > 60){
      var bossProjectile = new PianoBossProjectile(this);
      this.bossAttackTimer = 0;
    }
    else{
      this.bossAttackTimer++;
    }

  }

  //boss Jump timer
  checkBossJumpTimer(Pianoboss, hplabel, hpgraphics){
    if(Pianoboss == null){
      return;
    }
    if(handBossJumpCount >= handBossJumpTimer){
      handBossJumpCount =0;
      if(Pianoboss.body.velocity.y == 0){
        Pianoboss.body.velocity.y -= 400;
        hplabel.body.velocity.y -= 400;
        hpgraphics.body.velocity.y -= 400;
      }
      else if(Pianoboss.body.velocity.y == 400){
        Pianoboss.body.velocity.y -= 400;
        hplabel.body.velocity.y -= 400;
        hpgraphics.body.velocity.y -= 400;
        handBossJumpTimer = Phaser.Math.Between(20, 100);
      }
      else{
        Pianoboss.body.velocity.y += 800;
        hplabel.body.velocity.y += 800;
        hpgraphics.body.velocity.y += 800;
      }
    }
    else{handBossJumpCount++}
  }


  //projectile & enemy collision
  hurtBoss(projectiles, PianoBoss) {
    bossHealth -= playerDamage;
    projectiles.destroy();
    this.bossHPLabel.text = "HP:" + bossHealth + "/" + bossMaxHealth;
    if (bossHealth<= 0){
      score += bossMaxHealth;
      PianoBoss.destroy();
      this.scene.start('deadScene', {transferScore: score});
    }
  }

  //player hit by enemy projectile
  playerHit(submarine, bossProjectiles){
    playerHealth -=5000;
    this.playerHealthLabel.text = "PlayerHealth: " + playerHealth + "/" + playerMaxHealth;
    bossProjectiles.destroy();
    if(playerHealth <= 0){
      var submarineExplosion = new playerExplosionClass(this, submarine.x, submarine.y);
      this.scene.start('deadScene', {transferScore: score});
    }
  }

  //player hit boss
  crashDamage(submarine, PianoBoss){
    playerHealth -= PianoBoss.health;
    this.playerHealthLabel.text =  "PlayerHealth: " + playerHealth + "/" + playerMaxHealth;
    if (playerHealth <= 0){
      var submarineExplosion = new playerExplosionClass(this, submarine.x, submarine.y);
      this.scene.start('deadScene', {transferScore: score});
    }
  }

}