import Phaser from 'phaser';


export default class gameScene extends Phaser.Scene {
  constructor() {
    super('')
  }

  init(){
    this.meteor = undefined
    this.player = undefined
    this.engine = undefined
    this.bullet = undefined
    this.score = 0
    this.scoreLabel = undefined
    this.health = 3
    this.healthLabel = undefined
    this.speed = 200
    this.meteorSpeed = 100

    //key button
    this.cursor = undefined
  }

  preload() {
    this.load.image('meteor', 'images/meteor.png')

    // Background
    this.load.image('bg', 'images/layers/parallax-space-backgound.png')
    this.load.image('bg-planet', 'images/layers/parallax-space-big-planet.png')
    this.load.image('bg-stars', 'images/layers/parallax-space-stars.png')
    this.load.image('bg-far-planets', 'images/layers/parallax-space-far-planets.png')

    // Ships
    this.load.spritesheet('player', 'images/Foozle_2DS0013_Void_EnemyFleet_2/Nairan/Destruction/PNGs/Nairan - Bomber -  Destruction.png', {
      frameWidth: 64,
      frameHeight: 64
    })
    this.load.spritesheet('engine', 'images/Foozle_2DS0013_Void_EnemyFleet_2/Nairan/Engine Effects/PNGs/Nairan - Bomber - Engine.png', {
      frameWidth: 64,
      frameHeight: 64
    })

    // Bullets
    this.load.spritesheet('bullet', 'images/Foozle_2DS0013_Void_EnemyFleet_2/Nairan/Weapon Effects - Projectiles/PNGs/Nairan - Bolt.png', {
      frameWidth: 9,
      frameHeight: 9
    })
  }

  create() {
    // BACKGROUNDS
    this.add.image(200, 310, 'bg').setScale(2.5)
    this.add.image(300, 400, 'bg-far-planets')
    this.add.image(100, 200, 'bg-planet').setScale(1.5)
    this.add.image(200, 310, 'bg-stars').setScale(2)

    // PLAYER
    this.createPlayer()

    // KEYBOARD
    this.cursor = this.input.keyboard.createCursorKeys()

  }

  update(time){
    // MOVEMENT
    this.movePlayer(this.player, this.engine, time)
  }

  createPlayer(){
    // Add Player
    this.player = this.physics.add.sprite(200, 500, 'player')

    // Add Engine
    this.engine = this.physics.add.sprite(200, 500, 'engine')

    // Set World Bound
    this.player.setCollideWorldBounds(true)
  }

  movePlayer(player, engine, time){
    if(this.cursor.left.isDown){
      this.player.setVelocityX(-this.speed)
      this.engine.setVelocityX(-this.speed)
    } else if(this.cursor.right.isDown){
      this.player.setVelocityX(this.speed)
      this.engine.setVelocityX(this.speed)
    } else {
      this.player.setVelocityX(0)
      this.engine.setVelocityX(0)
    }
  }
}