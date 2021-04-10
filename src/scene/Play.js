class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    create(){
        this.add.text(320, 320, "Rocket Patrol Play");
    }
}