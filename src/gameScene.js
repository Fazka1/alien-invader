import Phaser from 'phaser';


export default class gameScene extends Phaser.Scene {
  constructor() {
    super('')
  }

  init(){
    this.meteor = undefined
    this.player = undefined
    this.bullet = undefined
    this.score = 0
    this.scoreLabel = undefined
    this.health = 3
    this.healthLabel = undefined
    this.speed = 100
    this.meteorSpeed = 100

    //key button
    this.leftBtn = undefined
    this.rightBtn = undefined
    this.shootButton = undefined
  }

  preload() {
    this.load.image('meteor', 'images/meteor.png')
    this.load.image('bullet', 'images/bullet.png')
    this.load.image('Ship Damaged', 'images/Ship Damaged.png')
    this.load.image('Full health', 'images/Full health.png')
    this.load.image('Ship Slight damage', 'images/Ship Slight damage.png')
    this.load.image('Ship Very damaged', 'images/Ship Very damaged.png')
    this.load.image('bg', 'images/layers/parallax-space-backgound.png')
  }

  create() {
    this.add.image(200, 310, 'bg').setScale(2.5)

  }

  update(time){
    
  }
}