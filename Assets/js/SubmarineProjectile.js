class SubmarineProjectiles extends Phaser.GameObjects.Sprite{
  constructor(scene){
    var x = scene.submarine.x + 175;
    var y = scene.submarine.y + 20;

    super(scene, x, y, "SubmarineProjectile");
    scene.add.existing(this);

    this.play("SubmarineProjectile_anim");
    scene.physics.world.enableBody(this);
    this.body.velocity.x= 300;
    scene.projectiles.add(this);
  }
  update(){
    if(this.x > config.width){this.destroy();}
  }
}