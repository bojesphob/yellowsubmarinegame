var config;
var game;
var currentWeather;

var gameSettings = {
    restingSpeed: 0,
  }

window.onload = function(){
    //var wcall = new weatherCalls();
    //getWeather();
    config = {
    width: 1920,
    height: 1080,
    scale:{
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.Center_BOTH
    },
    scene: [LoadingScene, Level1, Level1Boss, deadScene, Level2, Level2Boss, Level3, Level3Boss, Level4, Level4Boss],
    physics:{
        default: "arcade",
        arcade: {
            debug: false
        }
    }
   
}

game = new Phaser.Game(config);
}
