//menu is something that extended from the phaser library.
//uses the super keyword to call the constructor of the super class
//when we construct a menu object, we are going to use the 
//constructor of the parent scene object to construct it


//class Menus inherit Phaser.Scene, that is
//menu can be regarded as a Scene
class Menu extends Phaser.Scene {

    constructor(){
        super("menuScene");
    }

    preload(){
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.image('titlescreen', './assets/titlescreen.png');
    }

    create(){
        localStorage.setItem('single', true);
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize:'28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

    // this.add.text(game.config.width / 2, game.config.height / 3 - borderUISize - borderPadding,
    //      'ROCKET PATROL', menuConfig).setOrigin(0.5);
    // this.add.text(game.config.width / 2, game.config.height / 3, 'p1: <-> arrow to move & (F) to fire',
    //     menuConfig).setOrigin(0.5);
    // this.add.text(game.config.width / 2, game.config.height / 2 - 20, 'p2: A/D to move & (G) to fire',
    //     menuConfig).setOrigin(0.5);
    this.add.image(320, 240, 'titlescreen');
        
    menuConfig.backgroundColor = "#00FF00";
    menuConfig.backgroundColor = '#000';
    // this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding,
    //      'Press <-/A for Novice\n or ->/D for Expert', menuConfig).setOrigin(0.5);
    
    //imported artwork
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
    keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
    keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);

    let consoleConfig = {
        fontFamily: 'Menlo',
        fontSize:'15px',
        backgroundColor:'#F3B141',
        color: '#843605',
        align: 'left',
        padding:{
        top: 5,
        bottom: 5,
    },
        fixedWidth: 80
    };

    this.console = this.add.text(5, 450, 'console:', consoleConfig);
        //default single player
    
}
    
    update(){

        let consoleConfig = {
            fontFamily: 'Menlo',
            fontSize:'15px',
            backgroundColor:'#F3B141',
            color: '#843605',
            align: 'left',
            padding:{
            top: 5,
            bottom: 5,
        },
            fixedWidth: 150
        };

        if(Phaser.Input.Keyboard.JustDown(keyLEFT) || Phaser.Input.Keyboard.JustDown(keyA)){
            localStorage.setItem('selectedTime', 60);
            localStorage.setItem('spaceshipSpeed', 3);
            this.sound.play('sfx_select');
            this.prompt = this.add.text(90,450, 'Novice Mode!!!', consoleConfig);
        } else if(Phaser.Input.Keyboard.JustDown(keyRIGHT) || Phaser.Input.Keyboard.JustDown(keyD)){
            localStorage.setItem('selectedTime', 45);
            localStorage.setItem('spaceshipSpeed', 4);
            this.sound.play('sfx_select');
            this.prompt = this.add.text(90,450, 'Expert Mode!!!', consoleConfig);
        }
        //display the mode the play chooses.
        
        if(Phaser.Input.Keyboard.JustDown(keyO)){
            localStorage.setItem('single', 1);
            this.add.text(90,450, 'One Player Mode', consoleConfig);
            this.time.delayedCall(1000,
                ()=>{
                    this.scene.start('playScene');
                }
            );
        } else if(Phaser.Input.Keyboard.JustDown(keyT)) {
            localStorage.setItem('single', 0);
            this.add.text(90,450, 'Two Player Mode', consoleConfig);
            this.time.delayedCall(1000,
                ()=>{
                    this.scene.start('playScene');
                }
            );

        }

    }

}