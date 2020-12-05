class enemyProjectile extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y, number){
    
    if(number == 1){
      super(scene, x, y, "enemy1Projectile");
      scene.add.existing(this);

      this.play("enemy1Projectile_anim");
      scene.physics.world.enableBody(this);
      this.body.velocity.x= -500;
      scene.enemyProjectiles.add(this);
    }
    if(number ==2){
      super(scene, x-175, y+20, "enemySubProjectile");
      scene.add.existing(this);
      this.play("enemySubProjectile_anim");
      scene.physics.world.enableBody(this);
      this.body.velocity.x = -500;
      scene.enemyProjectiles.add(this);
    }
    if(number ==3){
      super(scene, x-175, y+20, "enemySubProjectile");
      scene.add.existing(this);
      this.play("enemySubProjectile_anim");
      scene.physics.world.enableBody(this);
      this.body.velocity.x = -500;
      this.body.velocity.y = -150;
      scene.enemyProjectiles.add(this);
    }
    if(number == 4){
      super(scene, x-175, y+20, "enemySubProjectile");
      scene.add.existing(this);
      this.play("enemySubProjectile_anim");
      scene.physics.world.enableBody(this);
      this.body.velocity.x = -500;
      this.body.velocity.y = 150;
      scene.enemyProjectiles.add(this);
    }



  }
  update(){
    if(this.x > config.width){this.destroy();}
  }
}