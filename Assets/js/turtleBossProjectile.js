class turtleBossProjectile extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y, subx, suby){
    

    super(scene, x, y, "turtleBossProjectile");
    scene.add.existing(this);

    this.play("turtleBossProjectile_anim");
    scene.physics.world.enableBody(this);
    this.body.velocity.x= -500;
    this.body.velocity.y = (suby - y)/((x-subx)/500);
    scene.bossProjectiles.add(this);
  }
  update(){
    if(this.x > config.width){this.destroy();}
  }
}