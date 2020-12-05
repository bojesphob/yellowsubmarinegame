class PianoProjectileExplosions extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y){
    super(scene, x, y, "noteExplosion");
    scene.add.existing(this);
    this.play("noteExplosion_anim")  
    scene.physics.world.enableBody(this);
    scene.noteExplosions.add(this);
    this.timer = 0;
  }
  update(){
    this.timer ++;
  }
}