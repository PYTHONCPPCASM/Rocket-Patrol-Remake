let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play]
};

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let keyF, keyR, keyLEFT, keyRIGHT, keyA, keyD, keyG;


function preload(){
    game.load.audio('play_bgm', './assets/play_bgm.mp3');
}

var s;
var music;

function create(){
    music = game.add.audio('play_bgm');
    music.play();
}

console.log("Hello World\n");