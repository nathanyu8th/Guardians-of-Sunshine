class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    init() {
        // useful variables
        this.moveSpeed = -2;
        this.enemySpeed = -1.5;
        this.jumpPower = 0;
        this.gravityForce = 1200;

        this.gameTimer = 1000;
        this.canShoot = true;

        this.score = 0;

        this.platformVelocity = -100;
        this.trapTimer = 5000;

        this.bombCount = 0;
        this.bombVelocity = 1000;

        //enemy
        this.enemyRange = 200
        this.clock = 0

        
 

    }

    preload() {
        //animations
        // this.anims.create({
        //     key: "idle",
        //     frames: [{key: "character", frame: 0}],
        //     frameRate: 8,
        //     repeat: -1
        // })

        // this.anims.create({
        //     key: "walk",
        //     frames: this.anims.generateFrameNumbers("character", { start: 0, end: 2 }),
        //     frameRate: 8,
        //     repeat: -1
        // })

        // this.anims.create({
        //     key: "jump",
        //     frames: this.anims.generateFrameNumbers("character", {
        //         frames: [0, 3, 4]
        //     }),
        //     frameRate: 8,
        //     repeat: -1
        // })
        
    }

    create() {

        //background music
        this.music = this.sound.add("bgMusic", { loop: true });
        this.music.play();


        // add background grass
        //this.background = this.add.image(0, 0, "bgPlay").setOrigin(0);

        //this.background = this.add.tileSprite(0,0, game.config.width, game.config.height, "bgPlay").setOrigin(0, 0);
        this.background = this.physics.add.sprite(0,0, "background").setOrigin(0, 0);
        this.background = this.physics.add.sprite(2388,0, "background").setOrigin(0, 0);
        this.background = this.physics.add.sprite(20,game.config.height - 10, "background").setOrigin(0, 0).setFlipY(true);
        this.background = this.physics.add.sprite(2408,game.config.height - 10, "background").setOrigin(0, 0).setFlipY(true);

        //add item

        this.item4 = this.physics.add.sprite(width / 2, height - height/ 4 - 200, "bomb").setScale(0.5)
        this.item1 = this.physics.add.sprite(width - width / 4, height - height/ 4, "bomb").setScale(0.5)
        //this.item2 = this.physics.add.sprite(width * 2, height - height/ 4, "bomb").setScale(0.5)
        this.item3 = this.physics.add.sprite(width * 3 / 2 - 50, height - height/2, "bomb").setScale(0.5)
        this.items = this.add.group([this.item1, this.item3, this.item4]);
        

        //enemy
        this.enemy = this.physics.add.sprite(width - 50, height - height/4 + 20, "enemy").setVelocityX(-this.moveSpeed * 100);
        this.pointA = this.enemy.x
        this.pointB = this.enemy.x + this.enemyRange
        this.enemy2 = this.physics.add.sprite(width * 3 / 2 + 100, height - height/4 - 50, "enemy").setVelocityX(-this.moveSpeed * 100);
        this.pointA2 = this.enemy2.x
        this.pointB2 = this.enemy2.x + this.enemyRange
        this.enemy3 = this.physics.add.sprite(width * 5 / 2, height - height/5, "enemy").setVelocityX(-this.moveSpeed * 100);
        this.pointA3 = this.enemy3.x
        this.pointB3 = this.enemy3.x + this.enemyRange

        this.enemies = this.add.group([this.enemy, this.enemy2, this.enemy3])


        //temp character body
        this.body = this.physics.add.sprite(width / 4, height / 4, "mainCharacter").setOrigin(0).setCollideWorldBounds(true).setScale(0.7);
        this.body.setGravityY(this.gravityForce);

        //ground
        this.ground = this.physics.add.sprite(width/4, height - height/6, "ground").setImmovable().setScale(4, 7)
        this.ground2 = this.physics.add.sprite(width - 207, height, "ground").setImmovable().setScale(4,7)
        this.ground3 = this.physics.add.sprite(width * 5 / 4, height - height/4, "ground").setImmovable()
        this.ground4 = this.physics.add.sprite(width * 3 / 2 + 100, height - height/4, "ground").setImmovable()
        this.ground5 = this.physics.add.sprite(width * 3 / 2 - 50, height/ 2 + 50, "ground").setImmovable().setScale(0.5, 1)
        this.ground6 = this.physics.add.sprite(width * 2 - 300, height - height / 4, "ground").setImmovable().setScale(0.5, 1)
        this.ground7 = this.physics.add.sprite(width * 2, height - height / 4, "ground").setImmovable().setScale(0.5, 1)
        this.ground8 = this.physics.add.sprite(width * 2 + 300, height - height / 4, "ground").setImmovable().setScale(0.5, 1)
        this.ground9 = this.physics.add.sprite(width * 2 , height / 4 - 50, "ground").setImmovable().setScale(20, 9).setFlipY(true)
        this.ground10 = this.physics.add.sprite(width * 3 , height , "ground").setImmovable().setScale(8, 7)
        
        this.grounds = this.add.group([this.ground, this.ground2, this.ground3, this.ground4, this.ground5, this.ground6, this.ground7, this.ground8, this.ground9, this.ground10])
        this.physics.add.collider(this.body, this.grounds);


        this.physics.add.overlap(this.body, this.items, (body, item) => {
            item.destroy();
            this.bombCount += 1
            
        });

        this.coin = this.physics.add.sprite(width, height - height/4, "coin").setImmovable().setScale(0.5)

        this.coins = this.add.group([this.coin])

        this.physics.add.overlap(this.body, this.coins, (body, coin) => {
            coin.destroy();
            this.score += 10

            const emitter = this.add.particles(coin.x, coin.y, 'coin', {
                lifespan: 400,
                speed: { min: 150, max: 250 },
                scale: { start: 0.4, end: 0 },
                blendMode: 'ADD',
                emitting: false
            });
            emitter.explode(16);

        } )
        

        

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
            backgroundColor: "lightgreen",
            color: "#843605",
            align: "right",
            padding: {
                top: 5,
                bottom: 5,
            },
            //fixedWidth: 100,
        };

        this.attackLeft = this.add.text(
            width / 4 - 200,
            height - (height * 9) / 10,
            this.score,
            timeConfig
        ).setScrollFactor(0);

        this.timeLeft = this.add.text(
            width / 2,
            height - (height * 9) / 10,
            this.score,
            timeConfig
        ).setScrollFactor(0);

        this.bombCountText = this.add.text(
            width - width/4,
            height - (height * 9) / 10,
            this.bombCount,
            timeConfig
        ).setScrollFactor(0);
        
        
        this.cameras.main.setBounds(0,0, this.background.widthInPixels, this.background.heightInPixels)
        this.cameras.main.startFollow(this.body, true, 1, 1)
        this.physics.world.setBounds(0, 0, this.background.widthInPixels, this.background.heightInPixels)
    

        //create ending
        this.endFlag = this.physics.add.sprite(width * 3, height - height/4, "flag").setImmovable().setScale(3)
    
        this.physics.add.collider(this.body, this.endFlag, (body, flag) => {
            this.music.stop();
            this.scene.start("menuScene");
            
        });

        
    }

    

    update() {


        function setShoot(){
            this.canShoot = true;
        }
        this.timer = this.gameTimer;

        let jump = () => {
            if (this.body.body.touching.down) {
                this.body.setVelocityY(-600);
                //this.body.anims.play("jump", true);
                this.sound.play("jumpEffect");
                
            }
        };

        if (keyAttack.isDown && this.canShoot && this.bombCount > 0){
            
            if (this.body.flipX){
                this.bombVelocity = -200
            }
            else{
                this.bombVelocity = 200
            }
            let bomb = this.physics.add.sprite(this.body.x, this.body.y, "bomb").setVelocityX(this.bombVelocity * 3 / 2).setScale(0.5)
            this.canShoot = false;
            this.clock = this.time.delayedCall(this.timer, setShoot, null, this);
            this.bombCount -= 1;
            

            this.physics.add.collider(bomb, this.enemies, (bomb, enemy) => {
                enemy.destroy();
                bomb.destroy();

                this.score += 50
                //particle effects
                const emitter = this.add.particles(enemy.x, enemy.y, 'bomb', {

                    lifespan: 400,
                    speed: { min: 150, max: 250 },
                    scale: { start: 0.8, end: 0 },
                    blendMode: 'ADD',
                    emitting: false
                });
                emitter.explode(16);
                
            });

        }

        

        if (!this.body.body.touching.down){
            //this.body.anims.stop()
        }

        if (keyLeft.isDown) {
            this.body.setVelocityX(this.moveSpeed * 100)
            if (this.body.body.touching.down){
                //this.body.anims.play("walk", true);
            }
              
            this.body.flipX = true;  
        }
        else if (keyRight.isDown ) {
            this.body.setVelocityX(-this.moveSpeed * 100)
            if (this.body.body.touching.down){
                //this.body.anims.play("walk", true);
            }
             
            this.body.flipX = false;  
        }
        else{
            
            this.body.setVelocityX(0); // Stop when no key is pressed
            
        }

        // if (!keyRight.isDown && !keyLeft.isDown && this.body.body.touching.down){
        //     this.body.anims.play("idle", true);
        // }



        

        if (Phaser.Input.Keyboard.JustDown(keyJump)) {
            jump();

        }
        if (Phaser.Input.Keyboard.JustDown(keyQuit)) {
            this.music.stop();
            this.scene.start("menuScene");
        }


        
        

        if (this.enemy.x < this.pointA && this.enemy.body.velocity.x < 0) {
            this.enemy.setVelocityX(-this.enemySpeed * 100);
        } else if (this.enemy.x > this.pointB && this.enemy.body.velocity.x > 0) {
            this.enemy.setVelocityX(this.enemySpeed * 100);
        }
        
        if (this.enemy2.x < this.pointA2 && this.enemy2.body.velocity.x < 0) {
            this.enemy2.setVelocityX(-this.enemySpeed * 100);
        } else if (this.enemy2.x > this.pointB2 && this.enemy2.body.velocity.x > 0) {
            this.enemy2.setVelocityX(this.enemySpeed * 100);
        }

        if (this.enemy3.x < this.pointA3 && this.enemy3.body.velocity.x < 0) {
            this.enemy3.setVelocityX(-this.enemySpeed * 100);
        } else if (this.enemy3.x > this.pointB3 && this.enemy3.body.velocity.x > 0) {
            this.enemy3.setVelocityX(this.enemySpeed * 100);
        }

        

        this.physics.add.collider(this.body, this.enemies, (body, enemy) => {
            this.music.stop();
            this.scene.restart();
            
        });

        
        


        this.timeLeft.text = this.score;
        this.bombCountText.text = "Bomb Count: " + this.bombCount

        if (this.canShoot){
            this.attackLeft.text = "Cooldown: 0ms"
        }
        else{
            this.attackLeft.text = "Cooldown: " + (100 - this.clock.elapsed / 10).toFixed(0) + "ms"
            //console.log(this.clock)
        }

        if(this.body.y > game.config.height * 3 / 2){
            this.music.stop();
            this.scene.restart();
        }



    }
}
