class PianoBossProjectile extends Phaser.GameObjects.Sprite{
  constructor(scene){
    var updateTimer = 0;
    var noteX = Phaser.Math.Between(0, config.width - 500);
    var noteY = Phaser.Math.Between(0, config.height);

    super(scene, noteX, noteY, "PianoBossProjectile");
    scene.add.existing(this);
    this.updateTimer = 0;
    this.play("PianoBossProjectile_anim");
    scene.physics.world.enableBody(this);
    scene.bossProjectiles.add(this);
  }
  update(){
    this.updateTimer ++;
  }
}