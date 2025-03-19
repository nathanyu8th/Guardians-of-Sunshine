class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload(){
        this.load.path = "./assets/img/";
        //this.load.image("fire", "fire.png");
        this.load.image("bomb", "bomb.png");
        this.load.image("bullet", "Bullet.png");
        this.load.image("enemy", "enemy.png")
        this.load.image("boss", "Boss.png")
        this.load.image("ground", "GreenPlatform.png");
        //this.load.image("wall", "Platform.png");
        this.load.image("title", "GuardiansTitle.png");
        //this.load.image("bgWar", "bgWar.png");
        this.load.image("background", "background.png");
        this.load.image("mainCharacter", "character.png");
        this.load.image("flag", "EndFlag.png");
        this.load.image("coin", "Coin.png")
        this.load.image("teleport", "Teleporter.png")

        this.load.spritesheet("character", "CharacterAnim.png", {
            frameWidth: 64,
            frameHeight: 64
        })

        //sfx for jumping, background music, traps spawning in, play button

        this.load.audio("jumpEffect", "jumpEffect.mp3");
        this.load.audio("playButton", "playButton.mp3");
        this.load.audio("trapEffect", "trapEffect.mp3");
        this.load.audio("bgMusic", "backgroundEndlessRunner.mp3");

    }

    create(){
        let menuConfig = {
            fontFamily: "bold Courier",
            fontSize: "24px",
            backgroundColor: "green",
            color: "lightgreen",
            align: "left",
            padding: {
                top: 5,
                bottom: 5,
                left: 2,
                right: 2,
            },
            fixedWidth: 0,
        };

        let menu2Config = {
            fontFamily: "Courier",
            fontSize: "15px",
            backgroundColor: "lightgreen",
            color: "black",
            align: "right",
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0,
        };

        this.background = this.add.image(0, 0, "title").setOrigin(0);

        // this.add
        //     .text(
        //         game.config.width / 2,
        //         game.config.height / 2,
        //         "Guardians of Sunshine",
        //         menuConfig
        //     )
        //     .setOrigin(0.5);

        this.add
            .text(
                game.config.width / 8,
                game.config.height  - this.game.config.height /4,
                "P: Play\nZ: Jump\nQ: Quit\nX: Shoot",
                menuConfig
            )
            .setOrigin(0.5);

            this.add
            .text(
                game.config.width / 8 + 78,
                game.config.height  - this.game.config.height /2.5,
                "Use Arrow Keys to Move",
                menuConfig
            )
            .setOrigin(0.5);

            this.add
            .text(
                game.config.width * 3 / 5 + 60,
                game.config.height  - this.game.config.height /15,
                "Nathan Yu: Game Programmer/ Artist\nArt Software: Piskel\nAudio: Royalty Free",
                menu2Config
            )
            .setOrigin(0.5);

        //keys in the game
        keyPlay = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.P
        );
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyPlay)) {

            this.sound.play("playButton");
            this.scene.start("playScene");
        }
    }
}