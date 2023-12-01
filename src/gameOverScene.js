import Phaser from 'phaser'
export default class gameOverScene extends Phaser.Scene
{
    constructor(){
        super('over-scene')
    }
    
    init(){
        this.replayButton = undefined

    }

    preload(){
        this.load.image('bg', 'images/layers/parallax-space-backgound.png')
        this.load.image('bg-planet', 'images/layers/parallax-space-big-planet.png')
        this.load.image('bg-stars', 'images/layers/parallax-space-stars.png')
        this.load.image('bg-far-planets', 'images/layers/parallax-space-far-planets.png')
        
        
        this.load.image('replayButton', 'images/PNG/blue_button05.png')
        this.load.image('gameOver', 'images/PNG/blue_button05.png')
    }

    create(){
        this.add.image(200, 310, 'bg').setScale(2.5)
        this.add.image(300, 400, 'bg-far-planets')
        this.add.image(100, 200, 'bg-planet').setScale(1.5)
        this.add.image(200, 310, 'bg-stars').setScale(2)

        
        this.add.image(200, 500, 'replayButton')
        this.add.text(140, 485, 'Replay', {
            fontSize: '32px',
            color: 'white'
        })

        this.add.text(120, 320, 'Game Over', {
            fontSize: '32px',
            color: 'white'
        })
    }
}