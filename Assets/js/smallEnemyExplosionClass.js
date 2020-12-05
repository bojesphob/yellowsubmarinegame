class smallEnemyExplosionClass extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y){
    super(scene, x, y, "smallEnemyExplosion");
    scene.add.existing(this);
    this.play("smallEnemyExplosion_anim");
  }

}