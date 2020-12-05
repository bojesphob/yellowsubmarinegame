class playerExplosionClass extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y){
    super(scene, x, y, "playerExplosion");
    scene.add.existing(this);
    this.play("playerExplosion_anim");
  }
}