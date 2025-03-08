class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload(){
        this.load.path = "./assets/img/";
        this.load.image("fire", "fire.png");
        this.load.image("bomb", "bomb.png");
        this.load.image("enemy", "enemy.png")
        this.load.image("ground", "GreenPlatform.png");
        this.load.image("wall", "Platform.png");
        this.load.image("title", "GuardiansTitle.png");
        this.load.image("bgWar", "bgWar.png");
        this.load.image("background", "background.png");
        this.load.image("mainCharacter", "character.png");
        this.load.image("flag", "EndFlag.png");

        this.load.spritesheet("character", "characterAnim.png", {
            frameWidth: 32,
            frameHeight: 32
        })

        //sfx for jumping, background music, traps spawning in, play button

        this.load.audio("jumpEffect", "jumpEffect.mp3");
        this.load.audio("playButton", "playButton.mp3");
        this.load.audio("trapEffect", "trapEffect.mp3");
        this.load.audio("bgMusic", "backgroundEndlessRunner.mp3");

    }

    create(){
        let menuConfig = {
            fontFamily: "Courier",
            fontSize: "24px",
            backgroundColor: "lightgreen",
            color: "black",
            align: "right",
            padding: {
                top: 5,
                bottom: 5,
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

        this.add
            .text(
                game.config.width / 2,
                game.config.height / 2,
                "Guardians of Sunshine",
                menuConfig
            )
            .setOrigin(0.5);

        this.add
            .text(
                game.config.width / 2,
                game.config.height  - this.game.config.height /4,
                "Press P to Start Playing, Press W to Jump, Press Q to Quit",
                menuConfig
            )
            .setOrigin(0.5);

            this.add
            .text(
                game.config.width / 2,
                game.config.height  - this.game.config.height /3,
                "Use Arrow Keys to Move",
                menuConfig
            )
            .setOrigin(0.5);

            this.add
            .text(
                game.config.width / 2,
                game.config.height  - this.game.config.height /10,
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