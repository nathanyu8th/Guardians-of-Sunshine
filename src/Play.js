class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    init() {
        // useful variables
        this.moveSpeed = -1;
        this.jumpPower = 0;
        this.gravityForce = 500;
        this.jumps = 2;
        this.spawnRange = [50, 150];
        this.platformRange = [10, 200];

        this.gameTimer = 10000;

        this.score = 0;

        this.platformVelocity = -100;
        this.trapTimer = 5000;

        this.fallingTrap;
        this.fallingTrap2;
        this.fallingTrap3;
    }

    preload() {}

    create() {

        //background music
        this.music = this.sound.add("bgMusic", { loop: true });
        this.music.play();


        // add background grass
        //this.background = this.add.image(0, 0, "bgPlay").setOrigin(0);

        this.background = this.add.tileSprite(0,0, game.config.width, game.config.height, "bgPlay").setOrigin(0, 0);

        //add character
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




        //temp character body
        this.body = this.physics.add.sprite(width / 2, height / 4, "character").setOrigin(0).setCollideWorldBounds(true);
        this.body.setGravityY(this.gravityForce);



        this.platformGroup = this.add.group({
            removeCallback: function (platform) {
                platform.scene.platformBag.add(platform);
            },
        });

        this.platformBag = this.add.group({
            removeCallback: function (platform) {
                platform.scene.platformGroup.add(platform);
            },
        });

        //this.playerJumps = 0;

        this.addPlatform(game.config.width / 4, game.config.width / 2);
        this.addPlatform(
            game.config.width / 5,
            game.config.width - this.game.config.width / 4
        );
        //this.addPlatform2(game.config.width / 5, game.config.width / 2);

        keyLeft = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.LEFT
        );
        keyRight = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.RIGHT
        );

        keyJump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        keyQuit = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.Q
        );

        this.physics.add.collider(this.body, this.platformGroup);

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
        
        const updatePlatforms = () => {
                this.platformVelocity -= 50;
                this.platformGroup.getChildren().forEach((platform) => {
                    platform.setVelocityX(this.platformVelocity);
                    //platform.displayWidth /= 2;
                });
                this.platformBag.getChildren().forEach((platform) => {
                    platform.setVelocityX(this.platformVelocity);
                    //platform.displayWidth /= 2;
                });
                this.clock = this.time.delayedCall(this.timer, updatePlatforms, null, this);
                //console.log("works");
        }
        this.timer = this.gameTimer;
        this.clock = this.time.delayedCall(
            this.timer,
            () => {
                console.log("help")
                updatePlatforms();
                

            },
            null,
            this
        );

    const addProjectiles = () => {
        this.fallingTrap = this.physics.add.sprite(Phaser.Math.Between(0,width), 0, "cup").setGravityY(this.gravityForce);
        this.fallingTrap2 = this.physics.add.sprite(Phaser.Math.Between(0,width), 0, "cup").setGravityY(this.gravityForce);
        this.fallingTrap3 = this.physics.add.sprite(Phaser.Math.Between(0,width), 0, "cup").setGravityY(this.gravityForce);

        this.sound.play("trapEffect");
        
        this.clock = this.time.delayedCall(this.timer2, addProjectiles, null, this);
        //console.log("works");
        this.traps = this.add.group([this.fallingTrap, this.fallingTrap2, this.fallingTrap3]);
        this.physics.add.collider(this.body, this.traps, (body, traps) => {
            this.scene.restart();
            
        });
        
    }

    //this.traps = this.add.group([this.fallingTrap, this.fallingTrap2, this.fallingTrap3]);
    

    this.timer2 = this.trapTimer;
    this.clock = this.time.delayedCall(
        this.timer2,
        () => {
            console.log("trap")
            addProjectiles();
        },
        null,
        this
    );

    }

    addPlatform(platformWidth, posX) {
        let platform;

        if (this.platformBag.getLength()) {
            platform = this.platformBag.getFirst();
            platform.x = posX;
            platform.active = true;
            platform.visible = true;
            this.platformBag.remove(platform);
        } else {
            platform = this.physics.add.sprite(posX, height / 2, "wall");
            platform.setImmovable(true);
            platform.setVelocityX(this.platformVelocity);
            this.platformGroup.add(platform);
        }
        platform.displayWidth = platformWidth;
        this.nextPlatformDistance = Phaser.Math.Between(
            this.spawnRange[0],
            this.spawnRange[1]
        );
    }

    update() {

        let jump = () => {
            if (this.body.body.touching.down) {
                this.body.setVelocityY(-300);
                //this.body.anims.play("jump", true);
                this.sound.play("jumpEffect");
                
            }
        };

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
        this.background.tilePositionX += 1;

        

        if (Phaser.Input.Keyboard.JustDown(keyJump)) {
            jump();
            //console.log(this.platformVelocity);
        }
        if (Phaser.Input.Keyboard.JustDown(keyQuit)) {
            this.scene.start("menuScene");
        }

        //reusing platforms
        var minDist = width;
        this.platformGroup.getChildren().forEach(function (platform) {
            let platformDist = width - platform.x - platform.displayWidth / 2;

            minDist = Math.min(minDist, platformDist);
            if (platform.x < -platform.displayWidth / 2) {
                this.platformGroup.killAndHide(platform);
                this.platformGroup.remove(platform);
            }
        }, this);

        if (minDist > this.nextPlatformDistance) {
            var nextPlatformWidth = Phaser.Math.Between(
                this.platformRange[0],
                this.platformRange[1]
            );
            this.addPlatform(
                nextPlatformWidth,
                game.config.width + nextPlatformWidth / 2
            );
            //this.addPlatform2(nextPlatformWidth, game.config.width + nextPlatformWidth / 2);
        }

        this.score += 1;
        this.timeLeft.text = this.score;

        if(this.body.y + 100 > game.config.height){
            this.scene.restart();
        }

        // if (this.fallingTrap.y + 100 > game.config.height){
        //     this.fallingTrap.destroy();
        // }
    }
}
