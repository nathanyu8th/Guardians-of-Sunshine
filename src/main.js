// Code Practice: RNGolf
// Name: Nathan Yu
// Date: 1/29/25

'use strict'

/**
 * 
 * Title: Guardians of Sunshine
 * Hours: 25 hours
 * 
 * Utilized particle systems, game timers, physics systems, cameras, and text objects.
 * Maybe you may have missed it on your first playthrough, but you can drop from platforms and there will be a secret platform for the player.
 * 
 */

//const { Physics } = require("phaser")

let config = {
    type: Phaser.AUTO,
    width: 1290,
    height: 723,
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true
        }
    },
    pixelArt: true,
    scene: [ Menu, Play, Win ]
}

let keyPlay, keyRight, keyLeft, keyJump, keyQuit, keyAttack;

let game = new Phaser.Game(config)

let { width, height } = game.config