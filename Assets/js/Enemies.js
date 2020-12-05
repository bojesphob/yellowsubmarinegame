class Enemies extends Phaser.GameObjects.Sprite{
  constructor(scene, enemyNumber, levelMultiplier){
    var x = config.width;
    var y = Phaser.Math.Between(200, config.height - 200);
    var health;
    var starthealth;
    var attackTimer;
    var projectileNumber;


    //enemy 1 creation
    if (enemyNumber < 1){
    super(scene, x, y, "Enemy1");
    this.attackTimer = 0;
    scene.add.existing(this);
    this.play("Enemy1_anim");
    scene.physics.world.enableBody(this);
    this.projectileNumber = enemyNumber;

    this.body.velocity.x= -150;
    this.health = 300 * levelMultiplier;
    this.starthealth = 300 * levelMultiplier;

    scene.enemies.add(this);
    }
    if (enemyNumber >= 1 && enemyNumber <=2){
      super(scene, x, y, "Enemy2");
      this.attackTimer = 0;
      scene.add.existing(this);
      this.play("Enemy2_anim");
      scene.physics.world.enableBody(this);
      this.projectileNumber = enemyNumber;
      
      this.body.velocity.x= -150;
      this.health = 200 * levelMultiplier;
      this.starthealth = 200 * levelMultiplier;
  
      scene.enemies.add(this);
    }
    if (enemyNumber > 2 && enemyNumber <=3){
      super(scene, x, y, "Enemy3");
      this.attackTimer = 0;
      scene.add.existing(this);
      this.play("Enemy3_anim");
      scene.physics.world.enableBody(this);

      this.projectileNumber = enemyNumber;
  
      this.body.velocity.x= -150;
      this.health = 200 * levelMultiplier;
      this.starthealth = 200 * levelMultiplier;
  
      scene.enemies.add(this);
    }
    if (enemyNumber > 3 && enemyNumber <=4){
      super(scene, x, y, "Enemy4");
      this.attackTimer = 0;
      scene.add.existing(this);
      this.play("Enemy4_anim");
      scene.physics.world.enableBody(this);

      this.projectileNumber = enemyNumber;

      this.body.velocity.x= -150;
      this.health = 200 * levelMultiplier;
      this.starthealth = 200 * levelMultiplier;
  
      scene.enemies.add(this);
    }

    if (enemyNumber > 4 && enemyNumber <=5){
      super(scene, x, y, "Enemy5");
      this.attackTimer = 0;
      scene.add.existing(this);
      this.play("Enemy5_anim");
      scene.physics.world.enableBody(this);

      this.projectileNumber = enemyNumber;

      this.body.velocity.x= -150;
      this.health = 400 * levelMultiplier;
      this.starthealth = 400 * levelMultiplier;
  
      scene.enemies.add(this);
    }


  }
  update(){
    
    this.attackTimer++
    if(this.x < -50){
      this.destroy();
    }
    return this.attackTimer;
    
  }
  getHP(){
    return this.health;
  }
  getStartHP(){
    return this.starthealth;
  }
}