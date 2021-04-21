class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

     preload() {
        // load images/tile sprites

        this.load.image('rocket', './assets/rocket.png');
        this.load.image('rocket2', './assets/rocket2.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        {
          this.load.audio('play_bgm', './assets/play_bgm.mp3');
          this.load.audio('explosion1', './assets/explosion1.wav');
          this.load.audio('explosion2', './assets/explosion2.wav');
          this.load.audio('explosion3', './assets/explosion3.wav');
          this.load.audio('explosion4', './assets/explosion4.wav');
        }
        
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
                          frameWidth: 64,
                          frameHeight: 32,
                          startFrame: 0,
                          endFrame: 9}
                        );
      }

    create(){
      //place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        
        //green UI background
        
        // this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0,0);
        // this.add.rectangle(0,0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        // this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        // this.add.rectangle(0,0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        // this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        //put the rocket on screen

        if(localStorage.getItem('single') == 1){
          console.log('p1Spawned?');
          this.p1Rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        } else if(localStorage.getItem('single') == 0){
          this.p1Rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
          this.p2Rocket = new Rocket2(this, game.config.width / 3, game.config.height - borderUISize - borderPadding, 'rocket2').setOrigin(0.5, 0);
        }
        //put the ships on the screen
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
        //keys are involved, now they have these keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);

        //playing bgm
        let music = this.sound.add('play_bgm');
        this.anims.create({
          key: 'explode',
          frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
          frameRate: 30
        });
        //score
        this.p1Score = 0;
        //
        if(localStorage.getItem('highest') == null){ //nothing is stored
          this.highScore = 0;
        } else {
          this.highScore = localStorage.getItem('highest'); //found high score in local
        }

        let scoreConfig = {
          fontFamily: 'Courier',
          fontSize:'28px',
          backgroundColor:'#F3B141',
          color: '#843605',
          align: 'right',
          padding:{
            top: 5,
            bottom: 5,
          },
          fixedWidth: 80
        }

        let timeConfig = {
          fontFamily: 'Courier',
          fontSize:'28px',
          backgroundColor:'#F3B141',
          color: '#843605',
          align: 'right',
          padding:{
            top: 5,
            bottom: 5,
          },
          fixedWidth: 80
        }

          //game over flag
          this.gameOver = false;
          //display the score, place holder
          this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2,
          this.p1Score, scoreConfig);

          //place holder for highest score
          this.highScore = this.add.text(250, borderUISize + borderPadding * 2, this.highScore, scoreConfig);
          this.highText = this.add.text(150, borderUISize + borderPadding * 2, 'high', scoreConfig);
          //will display information

          this.console = this.add.text(5, 450, 'console:',
          {
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
          }
        );

          scoreConfig.fixedWidth = 0;

          this.fire = this.add.text(500, borderUISize + borderPadding * 2, 'fire', scoreConfig);
          music.play();

          let time = localStorage.getItem('selectedTime');  //time got from menu
          localStorage.setItem('currentTime', time);  //in localstorage, we will update this
          let runningTime = localStorage.getItem('currentTime');
          
          //start counting
          //put the time down
          //then check if it is being updated

          this.countDown = setInterval(
            ()=>{
              //display the time left
              runningTime = localStorage.getItem('currentTime'); //update the time
              localStorage.setItem('currentTime', runningTime - 1); //decrease by one using currentTime key
              this.timeLeft = this.add.text(350, borderUISize + borderPadding * 2, runningTime, timeConfig); //decrease
              console.log(runningTime); //output
              //when game is stopped
              if(runningTime == 0){
                this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5);
                this.add.text(game.config.width / 2, game.config.height / 2 + 64, '(R) to Restart',
                scoreConfig).setOrigin(0.5);
                this.gameOver = true;
                music.stop();
                //when game ends set the remaining time to 60s
                runningTime = time;
                //stop counting
                clearInterval(this.countDown);
              }
            },
            1000
          );
          
          //speed increase after 30s

            localStorage.setItem('s1Speed', 5);
            localStorage.setItem('s2Speed', 8);
            localStorage.setItem('s3Speed', 2);

          this.speedIncrease = this.time.delayedCall(30000, ()=> {

            this.warning = this.add.text(140, 240, 'Speed Change Observed!', scoreConfig);
            this.ship01.moveSpeed = localStorage.getItem('s1Speed');
            this.ship02.moveSpeed = localStorage.getItem('s2Speed');
            this.ship03.moveSpeed = localStorage.getItem('s3Speed');

            this.goAway = this.time.delayedCall(600,
              ()=>{
                this.warning.destroy();
              } 
            );
          }, null, this);
    }

    update() {
      let present;
      let background;

      if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
        this.scene.restart();
      }

        this.starfield.tilePositionX -= 4;

        if(!this.gameOver){

          this.p1Rocket.update();

          if(this.p1Rocket.isFiring){
            present = '#843605';
            background = '#F3B141';
          } else { //not present
            present = '#000000';
            background = '#000000';
          }

          if(localStorage.getItem('single') == false){

            this.p2Rocket.update();
            if(keyA.isDown && this.p2Rocket.x >= borderUISize + this.p2Rocket.width){
              this.p2Rocket.x -= this.p2Rocket.moveSpeed;
            } else if(keyD.isDown && this.p2Rocket.x <= game.config.width - borderUISize - this.p2Rocket.width){
              this.p2Rocket.x += this.p2Rocket.moveSpeed;
            }

            if(this.p2Rocket.isFiring){
              present = '#843605';
              background = '#F3B141';
            } else { //not present
              present = '#000000';
              background = '#000000';
            }

          }
          //switch direction after launching

          if(keyLEFT.isDown && this.p1Rocket.x >= borderUISize + this.p1Rocket.width){
            this.p1Rocket.x -= this.p1Rocket.moveSpeed;
          } else if(keyRIGHT.isDown && this.p1Rocket.x <= game.config.width - borderUISize - this.p1Rocket.width){
            this.p1Rocket.x += this.p1Rocket.moveSpeed;
          }

          let scoreConfig = {
            fontFamily: 'Courier',
            fontSize:'28px',
            backgroundColor: background,
            color: present,
            align: 'right',
            padding:{
              top: 5,
              bottom: 5,
            },
            fixedWidth: 120
          }

          this.fire = this.add.text(450, borderUISize + borderPadding * 2, 'fire', scoreConfig);

          this.ship01.update();
          this.ship02.update();
          this.ship03.update();
        }

        this.checkForTwo();

      }

      //check collision between rocket and spaceship
      checkCollision(rocket, ship){
        if(rocket.x < ship.x + ship.width &&
           rocket.x + rocket.width > ship.x &&
           rocket.y < ship.y + ship.height &&
           rocket.height + rocket.y > ship.y) {
            let listOfExplosion = [
              'sfx_explosion',
              'explosion1',
              'explosion2',
              'explosion3',
              'explosion4'
            ];
            let randomSound = Phaser.Math.Between(0,4);
            this.sound.play(listOfExplosion[randomSound]);
             return true;
           } else {
             return false;
           }
      }

      shipExplode(ship){

        ship.alpha = 0;
        //boom object, add sprite ship.x ship.y
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        //when animation is completed
        boom.on('animationcomplete', ()=>{
          ship.reset();
          ship.alpha = 1;
          boom.destroy();
        });

        this.p1Score += ship.points;
        
        //displaying the current score

        this.scoreLeft.text = this.p1Score;

        //check if the score in the local is the highest?
        //if yes update it

        if(this.p1Score > localStorage.getItem('highest')){
          localStorage.setItem('highest', this.p1Score);
        }

        //it will always be highest
        
        this.highScore.text = localStorage.getItem('highest');

        //script update the current time
      }
      //add five second to the currentTime in localStorage
      addTime(x){
        let current = parseInt(localStorage.getItem('currentTime')) + parseInt(x);
        localStorage.setItem('currentTime', current);
        this.add.text();
      }

      displayBonus(amount){

        this.bonus = this.add.text(85, 450, amount, 
          {
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
          }
        );

        this.showAndGone = this.time.delayedCall(400,
          ()=>{
            this.bonus.destroy();
          }
        );

      }

      checkForTwo(){
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
          this.p1Rocket.reset()
          this.shipExplode(this.ship03);
          this.addTime(3);
          this.displayBonus('time+!');
        }

        if (this.checkCollision(this.p1Rocket, this.ship02)) {
          this.p1Rocket.reset();
          this.shipExplode(this.ship02);
          this.addTime(2);
          this.displayBonus('time++!');
        }

        if (this.checkCollision(this.p1Rocket, this.ship01)) {
          this.p1Rocket.reset();
          this.shipExplode(this.ship01);
          this.addTime(1);
          this.displayBonus('time+++!');
        }
        
        if(localStorage.getItem('single') == 0){
          if(this.checkCollision(this.p2Rocket, this.ship03)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship03);
            this.addTime(3);
            this.displayBonus('time+!');
          }
  
          if (this.checkCollision(this.p2Rocket, this.ship02)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship02);
            this.addTime(2);
            this.displayBonus('time++!');
          }
  
          if (this.checkCollision(this.p2Rocket, this.ship01)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship01);
            this.addTime(1);
            this.displayBonus('time+++!');
          }
        }
        
      }

}