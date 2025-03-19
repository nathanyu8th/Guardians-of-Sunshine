class Win extends Phaser.Scene {
    constructor(){
        super("winScene");

        
            
    }

    init(){

        let playScene = this.scene.get("playScene");
        this.finalScore =  playScene.score     
    }

    create(){
        let winConfig = {
            fontFamily: "bold Courier",
            fontSize: "80px",
            color: "lightgreen",
            align: "right",
            padding: 5
        };


        this.add.text(
            width/2,
            height/4,
            "YOU WIN!",
            winConfig
        
        ).setOrigin(0.5)

        this.add.text(
            width/2,
            height - height / 4,
            this.finalScore,
            winConfig   
        
        ).setOrigin(0.5)

        keyQuit = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.Q
        );
    }   

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyQuit)) {
            this.scene.start("menuScene");
            
        }
    }
}