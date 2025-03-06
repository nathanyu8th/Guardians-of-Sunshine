class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    init() {
        // useful variables
        this.moveSpeed = -1;
        this.jumpPower = 0;
        this.gravityForce = 500;

        this.gameTimer = 1000;
        this.canShoot = true;

        this.score = 0;

        this.platformVelocity = -100;
        this.trapTimer = 5000;

        this.bombCount = 0;
        this.bombVelocity = 200;

    }

    preload() {
        //animations
        this.anims.create({
            key: "idle",
            frames: [{key: "character", frame: 0}],
            frameRate: 8,
            repeat: -1
        })

        this.anims.create({
            key: "walk",
            frames: this.anims.generateFrameNumbers("character", { start: 0, end: 2 }),
            frameRate: 8,
            repeat: -1
        })

        this.anims.create({
            key: "jump",
            frames: this.anims.generateFrameNumbers("character", {
                frames: [0, 3, 4]
            }),
            frameRate: 8,
            repeat: -1
        })
    }

    create() {

        //background music
        this.music = this.sound.add("bgMusic", { loop: true });
        this.music.play();


        // add background grass
        //this.background = this.add.image(0, 0, "bgPlay").setOrigin(0);

        this.background = this.add.tileSprite(0,0, game.config.width, game.config.height, "bgPlay").setOrigin(0, 0);

        //add item

        this.item = this.add.sprite(width, height - height/ 4 - 100, "fire")
        




        //temp character body
        this.body = this.physics.add.sprite(width / 2, height / 4, "character").setOrigin(0).setCollideWorldBounds(true);
        this.body.setGravityY(this.gravityForce);

        //ground
        this.ground = this.physics.add.sprite(width/2, height - height/4, "ground").setImmovable();
        this.ground2 = this.physics.add.sprite(width - width/4, height - height/4, "ground").setImmovable();
        this.ground3 = this.physics.add.sprite(width, height - height/4, "ground").setImmovable();
        this.ground4 = this.physics.add.sprite(width + width/4, height - height/4, "ground").setImmovable();
        
        this.grounds = this.add.group([this.ground, this.ground2, this.ground3, this.ground4])
        this.physics.add.collider(this.body, this.grounds);



        

        

        keyLeft = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.LEFT
        );
        keyRight = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.RIGHT
        );

        keyJump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);

        keyQuit = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.Q
        );

        keyAttack = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.X
        );

        

        //UI Creation

        let timeConfig = {
            fontFamily: "Courier",
            fontSize: "28px",
            backgroundColor: "#F3B141",
            color: "#843605",
            align: "right",
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100,
        };

        this.timeLeft = this.add.text(
            width / 2,
            height - (height * 9) / 10,
            this.score,
            timeConfig
        );
        
        
        this.cameras.main.setBounds(0,0, this.background.widthInPixels, this.background.heightInPixels)
        this.cameras.main.startFollow(this.body, true, 1, 1)
        this.physics.world.setBounds(0, 0, this.background.widthInPixels, this.background.heightInPixels)
    

    //this.traps = this.add.group([this.fallingTrap, this.fallingTrap2, this.fallingTrap3]);
    

    }

    

    update() {


        function setShoot(){
            this.canShoot = true;
        }
        this.timer = this.gameTimer;

        let jump = () => {
            if (this.body.body.touching.down) {
                this.body.setVelocityY(-300);
                //this.body.anims.play("jump", true);
                this.sound.play("jumpEffect");
                
            }
        };

        if (keyAttack.isDown && this.canShoot){
            if (this.body.flipX){
                this.bombVelocity = -200
            }
            else{
                this.bombVelocity = 200
            }
            this.physics.add.sprite(this.body.x, this.body.y - 10, "fire").setVelocityX(this.bombVelocity);
            this.canShoot = false;
            this.clock = this.time.delayedCall(this.timer, setShoot, null, this);
        }

        if (!this.body.body.touching.down){
            this.body.anims.stop()
        }

        if (keyLeft.isDown) {
            this.body.x += this.moveSpeed;
            if (this.body.body.touching.down){
                this.body.anims.play("walk", true);
            }
              
            this.body.flipX = true;  
        }
        if (keyRight.isDown ) {
            this.body.x -= this.moveSpeed;
            if (this.body.body.touching.down){
                this.body.anims.play("walk", true);
            }
             
            this.body.flipX = false;  
        }

        if (!keyRight.isDown && !keyLeft.isDown && this.body.body.touching.down){
            this.body.anims.play("idle", true);
        }

        //moving background
        //this.background.tilePositionX += 1;

        

        if (Phaser.Input.Keyboard.JustDown(keyJump)) {
            jump();
            //console.log(this.platformVelocity);
        }
        if (Phaser.Input.Keyboard.JustDown(keyQuit)) {
            this.scene.start("menuScene");
        }

        


        // this.score += 1;
        // this.timeLeft.text = this.score;

        if(this.body.y + 100 > game.config.height){
            this.scene.restart();
        }

        //colliders

    }
}
