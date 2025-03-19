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

        this.bossHealth = 3

        
 

    }

    preload() {
        
        
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
        this.background = this.physics.add.sprite(2388 * 2,0, "background").setOrigin(0, 0);
        this.background = this.physics.add.sprite(20,game.config.height - 10, "background").setOrigin(0, 0).setFlipY(true);
        this.background = this.physics.add.sprite(2408,game.config.height - 10, "background").setOrigin(0, 0).setFlipY(true);
        this.background = this.physics.add.sprite(2408 + 2388,game.config.height - 10, "background").setOrigin(0, 0).setFlipY(true);
        


        //add item

        this.item4 = this.physics.add.sprite(width / 2, height - height/ 4 - 100, "bomb").setScale(0.5)
        this.item1 = this.physics.add.sprite(width - width / 4, height - height/ 4 + 50, "bomb").setScale(0.5)
        this.item2 = this.physics.add.sprite(width, height * 3 / 2 + 50, "bomb").setScale(0.5)
        this.item3 = this.physics.add.sprite(width * 3 / 2 - 50, height - height/2, "bomb").setScale(0.5)
        this.item5 = this.physics.add.sprite(width + 100, height * 3 / 2 + 50, "bomb").setScale(0.5)
        this.item6 = this.physics.add.sprite(width * 3 + 800 - 50, height / 2 - 50, "bomb").setScale(0.5)
        this.item7 = this.physics.add.sprite(width * 3 + 800, height / 2 - 50, "bomb").setScale(0.5)
        this.item8 = this.physics.add.sprite(width * 3 + 800 + 50, height / 2 - 50, "bomb").setScale(0.5)
        this.item9 = this.physics.add.sprite(width * 3 + 300, height * 3 / 2 + 50, "bomb").setScale(0.5)
        this.item10 = this.physics.add.sprite(width * 3 + 800 + 150, height / 2 - 50, "bomb").setScale(0.5)
        this.item11 = this.physics.add.sprite(width * 3 + 800 + 100, height / 2 - 50, "bomb").setScale(0.5)


        this.items = this.add.group([this.item1, this.item2, this.item3, this.item4, this.item5, this.item6, this.item7, this.item8, this.item9, this.item10, this.item11]);
        

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
        this.enemy4 = this.physics.add.sprite(width * 3 / 2 + 100, height * 3 / 2 + 50, "enemy").setVelocityX(-this.moveSpeed * 100);
        this.pointA4 = this.enemy4.x
        this.pointB4 = this.enemy4.x + this.enemyRange
        this.enemy5 = this.physics.add.sprite(width * 3 + 400, height - height / 6 - 50, "enemy").setVelocityX(-this.moveSpeed * 100);
        this.pointA5 = this.enemy5.x
        this.pointB5 = this.enemy5.x + this.enemyRange
        this.enemy6 = this.physics.add.sprite(width * 3 + 300, height - height/3 - 50, "enemy").setVelocityX(-this.moveSpeed * 100);
        this.pointA6 = this.enemy6.x
        this.pointB6 = this.enemy6.x + this.enemyRange

        this.enemies = this.add.group([this.enemy, this.enemy2, this.enemy3, this.enemy4, this.enemy5, this.enemy6])

        


        //temp character body
        this.body = this.physics.add.sprite(width / 4, height / 4, "mainCharacter").setOrigin(0).setCollideWorldBounds(true).setScale(0.7);
        this.body.setGravityY(this.gravityForce);

        this.physics.add.collider(this.body, this.enemies, (body, enemy) => {
            this.music.stop();
            this.scene.restart();
            
        });

        //ground
        this.ground = this.physics.add.sprite(width/4, height - height/6, "ground").setImmovable().setScale(4, 7)
        this.ground2 = this.physics.add.sprite(width - 207, height, "ground").setImmovable().setScale(4,7)
        this.ground3 = this.physics.add.sprite(width * 5 / 4, height - height/4, "ground").setImmovable()
        this.ground4 = this.physics.add.sprite(width * 3 / 2 + 100, height - height/4, "ground").setImmovable()
        this.ground5 = this.physics.add.sprite(width * 3 / 2 - 50, height/ 2 + 50, "ground").setImmovable().setScale(0.5, 1)
        this.ground6 = this.physics.add.sprite(width * 2 - 300, height - height / 4, "ground").setImmovable().setScale(0.5, 1)
        this.ground7 = this.physics.add.sprite(width * 2, height - height / 4, "ground").setImmovable().setScale(0.5, 1)
        this.ground8 = this.physics.add.sprite(width * 2 + 300, height - height / 4, "ground").setImmovable().setScale(0.5, 1)
        this.ground9 = this.physics.add.sprite(width * 3 , height / 4 - 50, "ground").setImmovable().setScale(33, 9).setFlipY(true)
        this.ground10 = this.physics.add.sprite(width * 3 - 400 , height , "ground").setImmovable().setScale(4, 7)
        this.ground11 = this.physics.add.sprite(width * 3 / 2 , height * 3 / 2 + 100, "ground").setImmovable().setScale(7, 1)
        this.ground12 = this.physics.add.sprite(width * 3 + 200, height, "ground").setImmovable().setScale(0.5, 1)
        this.ground13 = this.physics.add.sprite(width * 3 + 400, height - height / 6, "ground").setImmovable().setScale(0.5, 1)
        this.ground14 = this.physics.add.sprite(width * 3 + 300, height - height/3, "ground").setImmovable().setScale(0.5, 1)
        this.ground15 = this.physics.add.sprite(width * 3 + 800, height / 2, "ground").setImmovable().setScale(4, 1)
        this.ground16 = this.physics.add.sprite(width * 3 + 300, height * 3/2 + 100, "ground").setImmovable().setScale(3, 1)
        this.ground17 = this.physics.add.sprite(width * 4.5, height, "ground").setImmovable().setScale(7, 9)

        
        this.grounds = this.add.group([this.ground, this.ground2, this.ground3, this.ground4, this.ground5, this.ground6, this.ground7,
             this.ground8, this.ground9, this.ground10, this.ground11, this.ground12, this.ground13, this.ground14, this.ground15, this.ground16,
            this.ground17])
        this.physics.add.collider(this.body, this.grounds);

        

        this.physics.add.overlap(this.body, this.items, (body, item) => {
            item.destroy();
            this.bombCount += 1
            
        });

        this.coin = this.physics.add.sprite(width * 3 / 5, height - height/4 + 50, "coin").setImmovable().setScale(0.5)
        this.coin2 = this.physics.add.sprite(width * 3 / 5 + 50, height - height/4 + 50, "coin").setImmovable().setScale(0.5)
        this.coin3 = this.physics.add.sprite(width * 3 / 5 + 100, height - height/4 + 50, "coin").setImmovable().setScale(0.5)
        this.coin4 = this.physics.add.sprite(width * 3 / 5 + 150, height - height/4 + 50, "coin").setImmovable().setScale(0.5)
        this.coin5 = this.physics.add.sprite(width * 3 - 350, height - height/4, "coin").setImmovable().setScale(0.5)
        this.coin6 = this.physics.add.sprite(width * 3 - 300, height - height/4, "coin").setImmovable().setScale(0.5)
        this.coin7 = this.physics.add.sprite(width * 3 - 250, height - height/4, "coin").setImmovable().setScale(0.5)
        this.coin8 = this.physics.add.sprite(width * 3 + 200 - 20, height -  50, "coin").setImmovable().setScale(0.5)
        this.coin9 = this.physics.add.sprite(width * 3 + 200 + 20, height -  50, "coin").setImmovable().setScale(0.5)
        this.coin10 = this.physics.add.sprite(width * 3 + 400 - 20, height - height / 6 -  50, "coin").setImmovable().setScale(0.5)
        this.coin11 = this.physics.add.sprite(width * 3 + 400 + 20, height - height / 6 -  50, "coin").setImmovable().setScale(0.5)
        this.coin12 = this.physics.add.sprite(width * 3 + 300 - 20, height - height / 3 -  50, "coin").setImmovable().setScale(0.5)
        this.coin13 = this.physics.add.sprite(width * 3 + 300 + 20, height - height / 3 -  50, "coin").setImmovable().setScale(0.5)
        this.coin14 = this.physics.add.sprite(width * 3 + 300 + 30, height * 3/2 +  50, "coin").setImmovable().setScale(0.5)
        this.coin15 = this.physics.add.sprite(width * 3 + 300 - 30, height * 3/2 +  50, "coin").setImmovable().setScale(0.5)
        this.coin16 = this.physics.add.sprite(width * 3 + 300 + 60, height * 3/2 +  50, "coin").setImmovable().setScale(0.5)
        this.coin17 = this.physics.add.sprite(width * 3 + 300 - 60, height * 3/2 +  50, "coin").setImmovable().setScale(0.5)

        this.coins = this.add.group([this.coin, this.coin2, this.coin3, this.coin4, this.coin5, this.coin6, this.coin7, this.coin8, this.coin9,
             this.coin10, this.coin11, this.coin12, this.coin13, this.coin14, this.coin15, this.coin16, this.coin17])

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


        //teleporter
        this.teleport = this.physics.add.sprite(width * 2, height * 3 / 2 + 50, "teleport").setImmovable()
        this.teleport2 = this.physics.add.sprite(width * 3 + 300 + 180, height * 3 / 2 + 50, "teleport").setImmovable()

        this.teleports = this.add.group([this.teleport, this.teleport2])
        
        this.physics.add.collider(this.body, this.teleports, (body, teleport) => {
            body.y -= height + 100;
        })
        

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

        //animations
        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("character", { start: 0, end: 2 }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: "walk",
            frames: this.anims.generateFrameNumbers("character", { start: 3, end: 4 }),
            frameRate: 4,
            repeat: 0
        })

        this.anims.create({
            key: "jump",
            frames: this.anims.generateFrameNumbers("character", {
                frames: [3, 4, 5]
            }),
            frameRate: 8,
            repeat: 0
        })

        

        //UI Creation

        let timeConfig = {
            fontFamily: "bold Courier",
            fontSize: "28px",
            backgroundColor: "lightgreen",
            color: "#843605",
            align: "right",
            padding: 5
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

        //boss
        this.boss = this.physics.add.sprite(width * 4.5, height - height / 3 + 20, "boss").setImmovable().setScale(4)

        this.physics.add.collider(this.body, this.boss, (body, boss) => {
            this.music.stop();
            this.scene.restart();
            
        });

        //enemy bullets
        this.bullets = this.physics.add.group({
            defaultKey: "bullet",
            maxSize: 10
        });

        this.physics.add.collider(this.body, this.bullets, (body, bullet) => {
            this.music.stop();
            this.scene.restart();
            
        });

        

        this.time.addEvent({
            delay: 3000,
            callback: this.bossShoot,
            callbackScope: this,
            loop: true
        });
    

        //create ending
        this.endFlag = this.physics.add.sprite(width * 5, height - height/3 + 50, "flag").setImmovable().setScale(3)
    
        this.physics.add.collider(this.body, this.endFlag, (body, flag) => {
            
            this.scene.start("winScene");
            
        });

        
    }

    bossShoot(){
        if (this.bossHealth > 0){
            let bullet = this.bullets.get(this.boss.x, this.boss.y, "bullet").setScale(2);
            let angle = Phaser.Math.Angle.Between(this.boss.x, this.boss.y, this.body.x, this.body.y);
            let speed = 300;

            bullet.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);

            // Destroy bullet after some time
            this.time.delayedCall(3000, () => bullet.destroy());
        }
        
    }

    

    update() {


        function setShoot(){
            this.canShoot = true;
        }
        this.timer = this.gameTimer;
        

        let jump = () => {
            if (this.body.body.touching.down) {
                this.body.setVelocityY(-600);
                this.body.anims.stop();
                this.body.anims.play("jump", true);
                this.sound.play("jumpEffect");
                
            }
        };
        // && this.bombCount > 0
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

            this.physics.add.collider(bomb, this.boss, (bomb, boss) => {
                this.bossHealth -= 1
                bomb.destroy();

                //this.score += 50
                //particle effects
                const emitter = this.add.particles(boss.x, boss.y, 'bomb', {

                    lifespan: 400,
                    speed: { min: 150, max: 250 },
                    scale: { start: 0.8, end: 0 },
                    blendMode: 'ADD',
                    emitting: false
                });
                emitter.explode(16);
                
            });
            this.physics.add.collider(bomb, this.bullets, (bomb, bullet) => {
                bomb.destroy();
                bullet.destroy();

                //this.score += 50
                //particle effects
                const emitter = this.add.particles(bomb.x, bomb.y, 'bullet', {

                    lifespan: 400,
                    speed: { min: 150, max: 250 },
                    scale: { start: 0.8, end: 0 },
                    blendMode: 'ADD',
                    emitting: false
                });
                emitter.explode(16);
                
            });

        }

        if (this.bossHealth === 0){
            this.boss.destroy();
            this.score += 500
            this.bossHealth -= 1
            
        }

        

        if (!this.body.body.touching.down){
            //this.body.anims.stop()
        }

        if (keyLeft.isDown) {
            this.body.setVelocityX(this.moveSpeed * 100)
            if (this.body.body.touching.down){
                this.body.anims.play("walk", true);
            }
              
            this.body.flipX = true;  
        }
        else if (keyRight.isDown ) {
            this.body.setVelocityX(-this.moveSpeed * 100)
            if (this.body.body.touching.down){
                this.body.anims.play("walk", true);
            }
             
            this.body.flipX = false;  
        }
        else{
            
            this.body.setVelocityX(0); // Stop when no key is pressed
            
        }

        if (!keyRight.isDown && !keyLeft.isDown && this.body.body.touching.down){
            this.body.anims.play("idle", true);
        }



        

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
        if (this.enemy4.x < this.pointA4 && this.enemy4.body.velocity.x < 0) {
            this.enemy4.setVelocityX(-this.enemySpeed * 100);
        } else if (this.enemy4.x > this.pointB4 && this.enemy4.body.velocity.x > 0) {
            this.enemy4.setVelocityX(this.enemySpeed * 100);
        }
        if (this.enemy5.x < this.pointA5 && this.enemy5.body.velocity.x < 0) {
            this.enemy5.setVelocityX(-this.enemySpeed * 100);
        } else if (this.enemy5.x > this.pointB5 && this.enemy5.body.velocity.x > 0) {
            this.enemy5.setVelocityX(this.enemySpeed * 100);
        }
        if (this.enemy6.x < this.pointA6 && this.enemy6.body.velocity.x < 0) {
            this.enemy6.setVelocityX(-this.enemySpeed * 100);
        } else if (this.enemy6.x > this.pointB6 && this.enemy6.body.velocity.x > 0) {
            this.enemy6.setVelocityX(this.enemySpeed * 100);
        }

        

        

        
        


        this.timeLeft.text = this.score;
        this.bombCountText.text = "Bomb Count: " + this.bombCount

        if (this.canShoot){
            this.attackLeft.text = "Cooldown: 0ms"
        }
        else{
            this.attackLeft.text = "Cooldown: " + (100 - this.clock.elapsed / 10).toFixed(0) + "ms"
            //console.log(this.clock)
        }

        if(this.body.y > game.config.height * 2){
            this.music.stop();
            this.scene.restart();
        }



    }
}
