class fishBossProjectile extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y){
    

    super(scene, x, y, "fishBossProjectile");
    scene.add.existing(this);

    this.play("fishBossProjectile_anim");
    scene.physics.world.enableBody(this);
    this.body.velocity.x= -500;
    scene.bossProjectiles.add(this);
  }
  update(){
    if(this.x > config.width){this.destroy();}
  }
}