class LoadingScene extends Phaser.Scene{
    constructor(){
        super("LoadingScene");
    }

    preload(){
        //Background
        this.load.image('tophats', 'Assets/images/LoadingBase.png');
        this.load.spritesheet('thePlayButton', 'Assets/images/play.png', {
            frameWidth: 600,
            frameHeight: 145
        });
        //Loading icon and word spritesheets
        this.load.spritesheet('loadIcon', 'Assets/images/LoadingSprite.png', {
            frameWidth: 1920,
            frameHeight: 1080,
        });
        this.load.spritesheet('loadWord', 'Assets/images/LoadingWordSprite.png', {
            frameWidth: 673,
            frameHeight: 90
        });

        //Positioning icon and word
        this.loadIcon = this.add.sprite(config.width /2, config.height / 2, 'loadIcon');
        this.loadWord = this.add.sprite(config.width / 2, config.height + 145, 'loadWord');

         //load pixelfont
        this.load.bitmapFont("pixelFont", "Assets/font/font.png", "Assets/font/font.xml");
    }

    create(){
        
        this.anims.create({
            key: 'loadIcon_anim',
            frames: this.anims.generateFrameNumbers('loadIcon'),
            frameRate: 1,
            repeat: 0
        });
        this.anims.create({
            key: 'loadWord_anim',
            frames: this.anims.generateFrameNumbers('loadWord'),
            frameRate: 1,
            repeat: -1
        });
        this.celestialBody = this.add.tileSprite(960,540,config.width, config.height, 'tophats');
        this.rainbow = this.physics.add.sprite(960,540, 'loadIcon');
        this.rainbow.play('loadIcon_anim');
        this.theWord = this.physics.add.sprite(1000, 70, 'loadWord');
        this.theWord.play('loadWord_anim');
        this.playButton = this.physics.add.sprite(1000, 70,'thePlayButton').setInteractive();
        this.playButton.visible = false;
        this.playButton.on('pointerdown', function (pointer) {
            this.scene.scene.scene.start('Level1');
        }, this);


        /*//Score graphics
        var graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 1);
        graphics.beginPath();
        graphics.moveTo(0,0);
        graphics.lineTo(config.width, 0);
        graphics.lineTo(config.width, 80);
        graphics.lineTo(0, 80);
        graphics.lineTo(0, 0);
        graphics.closePath();
        graphics.fillPath();
*/
        // add top label
        this.MoveUp = this.add.bitmapText(10, 5, "pixelFont", "W = Move Up ", 60);
        this.MoveLeft = this.add.bitmapText(10, 85, "pixelFont", "A = Move Left ", 60)
        this.MoveRight = this.add.bitmapText(10, 165, "pixelFont", "S = Move Down ", 60);
        this.MoveDown = this.add.bitmapText(10, 245, "pixelFont", "D = Move Right" , 60);
        this.Fire = this.add.bitmapText(10, 325, "pixelFont", "SPACE = Fire" , 60);
    }

    update(){
        if(this.rainbow.anims.isPlaying == false){
            this.theWord.visible=false;
            this.playButton.visible=true;
        }
    }

}



