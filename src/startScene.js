import Phaser from 'phaser'
export default class startScene extends Phaser.Scene
{
    constructor(){
        super('start-Scene')
    }
    
    init(){
        this.startButton = undefined
    }

    preload(){
        this.load.image('bg', 'images/layers/parallax-space-backgound.png')
        this.load.image('bg-planet', 'images/layers/parallax-space-big-planet.png')
        this.load.image('bg-stars', 'images/layers/parallax-space-stars.png')
        this.load.image('bg-far-planets', 'images/layers/parallax-space-far-planets.png')
        
        
        this.load.image('startButton', 'images/PNG/blue_button05.png')
    }

    create(){
        this.add.image(200, 310, 'bg').setScale(2.5)
        this.add.image(300, 400, 'bg-far-planets')
        this.add.image(100, 200, 'bg-planet').setScale(1.5)
        this.add.image(200, 310, 'bg-stars').setScale(2)

        
        this.startButton = this.add.image(200, 500, 'startButton').setInteractive()
        this.add.text(150, 485, 'start', {
            fontSize: '32px',
            color: 'white'
        })
        this.startButton.once('pointerup', () => {
            this.scene.start('Alien Invader scene')
        }, this)

        this.add.text(80, 200, 'ALIEN INVADER', {
            fontSize: '32px',
            color: 'white',
            fontFamily: 'arial',
            fontStyle: 'bold'
        })
    }
}