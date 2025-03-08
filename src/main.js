// Code Practice: RNGolf
// Name: Nathan Yu
// Date: 1/29/25

'use strict'

/**
 * 
 * Title: Guardians of Sunshine
 * Hours: 25 hours
 * 
 * 
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
            debug: true
        }
    },
    scene: [ Menu, Play ]
}

let keyPlay, keyRight, keyLeft, keyJump, keyQuit, keyAttack;

let game = new Phaser.Game(config)

let { width, height } = game.config