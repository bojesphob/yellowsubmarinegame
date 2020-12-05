class PowerUp extends Phaser.GameObjects.Sprite{
  constructor(scene, powerUpNumber){
    var x = config.width;
    var y = Phaser.Math.Between(200, config.height - 200);
    var dissappearTimer;



    if (powerUpNumber <= 50){
      super(scene, x, y, "PowerUp1");
      scene.add.existing(this);
      this.dissappearTimer = 0;
      scene.physics.world.enableBody(this);
      this.body.velocity.x= Phaser.Math.Between(-500, -700);
      this.body.velocity.y = Phaser.Math.Between(-700, 700);
      this.body.collideWorldBounds = true;
      this.body.bounce.set(1);
      scene.PowerUps1.add(this);
    }
    if (powerUpNumber > 50 && powerUpNumber <=85){
      super(scene, x, y, "PowerUp2");
      scene.add.existing(this);
      this.dissappearTimer = 0;
      scene.physics.world.enableBody(this);
      this.body.velocity.x= Phaser.Math.Between(-500, -700);
      this.body.velocity.y = Phaser.Math.Between(-700, 700);
      this.body.collideWorldBounds = true;
      this.body.bounce.set(1);
      scene.PowerUps2.add(this);
    }
    if (powerUpNumber > 85){
      super(scene, x, y, "PowerUp3");
      scene.add.existing(this);
      this.dissappearTimer = 0;
      scene.physics.world.enableBody(this);
      this.body.velocity.x= Phaser.Math.Between(-500, -700);
      this.body.velocity.y = Phaser.Math.Between(-700, 700);
      this.body.collideWorldBounds = true;
      this.body.bounce.set(1);
      scene.PowerUps3.add(this);
    }

  }
  update(){
    //if(this.x < 0){this.destroy();}
    this.dissappearTimer ++;
    if(this.dissappearTimer >= 9000){this.destroy();}
  }
}