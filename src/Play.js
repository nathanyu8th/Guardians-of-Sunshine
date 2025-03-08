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

        //enemy
        this.enemyRange = 200

        
 

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

        //add item

        this.item4 = this.physics.add.sprite(width + 50, height - height/ 4 - 100, "bomb").setScale(0.5)
        this.item1 = this.physics.add.sprite(width, height - height/ 4 - 100, "bomb").setScale(0.5)
        this.item2 = this.physics.add.sprite(width - 50, height - height/ 4 - 100, "bomb").setScale(0.5)
        this.item3 = this.physics.add.sprite(width * 2, height - height/ 4 - 100, "bomb").setScale(0.5)
        this.items = this.add.group([this.item1, this.item2, this.item3, this.item4]);
        

        //enemy
        this.enemy = this.physics.add.sprite(width + 100, height - height/4 - 50, "enemy").setVelocityX(-this.moveSpeed * 100);
        this.pointA = this.enemy.x
        this.pointB = this.enemy.x + this.enemyRange


        //temp character body
        this.body = this.physics.add.sprite(width / 2, height / 4, "mainCharacter").setOrigin(0).setCollideWorldBounds(true);
        this.body.setGravityY(this.gravityForce);

        //ground
        this.ground = this.physics.add.sprite(width/2, height - height/4, "ground").setImmovable().setScale(7, 1)
        this.ground2 = this.physics.add.sprite(width - width/4, height - height/4, "ground").setImmovable()
        this.ground3 = this.physics.add.sprite(width, height - height/4, "ground").setImmovable()
        this.ground4 = this.physics.add.sprite(width + width/4, height - height/4, "ground").setImmovable()
        
        this.grounds = this.add.group([this.ground, this.ground2, this.ground3, this.ground4])
        this.physics.add.collider(this.body, this.grounds);


        this.physics.add.collider(this.body, this.items, (body, item) => {
            item.destroy();
            this.bombCount += 1
            
        });
        

        

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
        this.endFlag = this.physics.add.sprite(width + 100, height - height/4, "flag").setImmovable().setScale(2)
    
        this.physics.add.collider(this.body, this.endFlag, (body, flag) => {
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
                this.body.setVelocityY(-300);
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
            let bomb = this.physics.add.sprite(this.body.x, this.body.y, "bomb").setVelocityX(this.bombVelocity).setScale(0.5)
            this.canShoot = false;
            this.clock = this.time.delayedCall(this.timer, setShoot, null, this);
            this.bombCount -= 1;
            

            this.physics.add.collider(bomb, this.enemy, (bomb, enemy) => {
                enemy.destroy();
                bomb.destroy();
                
            });

        }

        if (!this.body.body.touching.down){
            //this.body.anims.stop()
        }

        if (keyLeft.isDown) {
            this.body.x += this.moveSpeed;
            if (this.body.body.touching.down){
                //this.body.anims.play("walk", true);
            }
              
            this.body.flipX = true;  
        }
        if (keyRight.isDown ) {
            this.body.x -= this.moveSpeed;
            if (this.body.body.touching.down){
                //this.body.anims.play("walk", true);
            }
             
            this.body.flipX = false;  
        }

        // if (!keyRight.isDown && !keyLeft.isDown && this.body.body.touching.down){
        //     this.body.anims.play("idle", true);
        // }

        //moving background
        //this.background.tilePositionX += 1;

        

        if (Phaser.Input.Keyboard.JustDown(keyJump)) {
            jump();
            //console.log(this.platformVelocity);
        }
        if (Phaser.Input.Keyboard.JustDown(keyQuit)) {
            this.scene.start("menuScene");
        }

        //enemyMovement
        

        if (this.enemy.x < this.pointA && this.enemy.body.velocity.x < 0) {
            this.enemy.setVelocityX(-this.moveSpeed * 100);
          } else if (this.enemy.x > this.pointB && this.enemy.body.velocity.x > 0) {
            this.enemy.setVelocityX(this.moveSpeed * 100);
        }

        this.physics.add.collider(this.body, this.enemy, (body, enemy) => {
            this.scene.restart();
            
        });

        
        


        // this.score += 1;
        // this.timeLeft.text = this.score;
        this.bombCountText.text = this.bombCount

        if(this.body.y + 100 > game.config.height + 100){
            this.scene.restart();
        }

        //colliders

    }
}
