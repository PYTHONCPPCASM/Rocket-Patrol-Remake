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
    create(){
        this.add.text(320, 320, "Rocket Patrol Menu");
    }
}