// Code Practice: RNGolf
// Name: Nathan Yu
// Date: 1/29/25

'use strict'

/**
 * 
 * Title: Warzone Escape
 * Hours: 25 hours
 * 
 * Nathan Yu: Game Programmer/ Artist
 * Art Software: Piskel
 * Audio: Royalty Free
 * https://pixabay.com/sound-effects/search/jump/  (Cartoon Jump)
 * https://pixabay.com/sound-effects/search/trap/  (Bear Trap)
 * https://pixabay.com/sound-effects/search/play%20button/ (button-pressed)
 * https://www.chosic.com/download-audio/31985/  (BG Music)
 * 
 * Creative Tilt: I think the way I implemented the platforms is interesting, as I dont just continually generate platforms, but rather I utilized dynamic programming
 *  to add all my platforms into different groups depending on whether they were active or not. This led to optimization and helped me reuse platforms. I took inspiration from 
 * https://emanueleferonato.com/2018/11/13/build-a-html5-endless-runner-with-phaser-in-a-few-lines-of-code-using-arcade-physics-and-featuring-object-pooling/.
 * 
 * The visual style is utilizing a brighter background to show the chaos but also adding some darker fire and blood to show that the setting isn't cheerful, but rather more
 * focused on the urgency of the situation.
 * 
 * 
 */

//const { Physics } = require("phaser")

let config = {
    type: Phaser.AUTO,
    width: 960,
    height: 960,
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true
        }
    },
    scene: [ Menu, Play ]
}

let keyPlay, keyRight, keyLeft, keyJump, keyQuit;

let game = new Phaser.Game(config)

let { width, height } = game.config