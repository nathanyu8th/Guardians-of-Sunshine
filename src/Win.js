class Win extends Phaser.Scene {
    constructor(){
        super("winScene");

        
            
    }

    preload(){
            
    }

    create(){
        let winConfig = {
            fontFamily: "bold Courier",
            fontSize: "100px",
            //backgroundColor: "lightgreen",
            color: "lightgreen",
            align: "right",
            padding: 5
            //fixedWidth: 100,
        };


        this.add.text(
            width/2,
            height/2,
            "YOU WIN!",
            winConfig
        
        ).setOrigin(0.5)

        keyQuit = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.Q
        );
    }   

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyQuit)) {
            this.music.stop();
            this.scene.start("menuScene");
            
        }
    }
}