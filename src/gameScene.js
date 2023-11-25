import Phaser from 'phaser';
import fallingObject from './fallingObject';
import Projectiles from './projectile';

export default class gameScene extends Phaser.Scene {
  constructor() {
    super('Alien Invader scene')
  }

  init(){
    this.meteor = undefined
    this.player = undefined
    this.engine = undefined
    this.projectiles = undefined
    this.score = 0
    this.scoreLabel = undefined
    this.health = 3
    this.healthLabel = undefined
    this.speed = 200
    this.meteorSpeed = 100
    this.boss = undefined
    this.scout = undefined

    this.lastFired = 10

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

    // Projectiles
    this.load.spritesheet('projectiles', 'images/Foozle_2DS0013_Void_EnemyFleet_2/Nairan/Weapon Effects - Projectiles/PNGs/Nairan - Bolt.png', {
      frameWidth: 9,
      frameHeight: 9
    })

    //boss
    this.load.spritesheet('enemyBoss', 'images/Foozle_2DS0013_Void_EnemyFleet_2/Nairan/Destruction/PNGs/Nairan - Dreadnought -  Destruction.png',{
      frameWidth: 128,
      frameHeight: 128
    })

    //scout
    this.load.spritesheet('scout', 'images/Foozle_2DS0013_Void_EnemyFleet_2/Nairan/Destruction/PNGs/Nairan - Scout -  Destruction.png', {
      frameWidth: 64,
      frameHeight: 64
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

    // METEOR
    this.meteor = this.physics.add.group({
      classType: fallingObject,
      maxSize: 10,
      runChildUpdate: true,
    })

    this.time.addEvent({
      delay: Phaser.Math.Between(1000,5000),
      callback: this.spawnMeteor,
      callbackScope: this,
      loop: true
    })

    //SCOUT
    this.scout = this.physics.add.group({
      classType: fallingObject,
      maxSize: 10,
      runChildUpdate: true,
      
    })

    this.time.addEvent({
      delay: Phaser.Math.Between(500, 1000),
      callback: this.spawnScout,
      callbackScope: this,
      loop: true
    })

    this.scoreLabel = this.add.text(10,10, 'score', {
      fontSize: '16px',
      color: 'black',
      backgroundColor: 'white'
    }).setDepth(1)

    this.healthLabel = this.add.text(10,30, 'health', {
      fontSize: '16px',
      color: 'black',
      backgroundColor: 'white'
    })

    this.physics.add.overlap(this.player, this.meteor, this.decreaseLife, null, this)
    this.physics.add.overlap(this.player, this.scout, this.decreaseLife, null, this)
    
    //PROJECTILES
    this.projectiles = this.physics.add.group({
      classType: Projectiles,
      maxSize: 10,
      runChildUpdate: true
    })

    this.physics.add.overlap(this.projectiles, this.meteor, this.hitEnemy, null, this)

    this.physics.add.overlap(this.projectiles, this.scout, this.hitScout, null, this)

  }

  update(time){
    // MOVEMENT
    this.movePlayer(this.player, this.engine, time)
    
    if (this.score >= 0 && this.score < 100){
      this.meteor.setActive(true)
      this.meteor.setVisible(true)
      this.scout.setActive(false)
      this.scout.setVisible(false)
    } else if(this.score >= 100 && this.score < 200){
      this.meteor.setActive(false)
      this.meteor.setVisible(false)
      this.scout.setActive(true)
      this.scout.setVisible(true)
    }

    

    this.scoreLabel.setText('Score : ' + this.score)
    this.healthLabel.setText('Health : ' + this.health)
  }

  createPlayer(){
    // Add Player
    this.player = this.physics.add.sprite(200, 500, 'player')

    // Add Engine
    this.engine = this.physics.add.sprite(200, 500, 'engine')

    // Set World Bound
    this.player.setCollideWorldBounds(true)
    this.engine.setCollideWorldBounds(true)

    // Engine Animation
    this.anims.create({
      key: 'engine-idle',
      frames: this.anims.generateFrameNumbers('engine', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    })

    // Player Animation
    this.anims.create({
      key: 'destroyed',
      frames: this.anims.generateFrameNumbers('player', { start:1, end: 15}),
      frameRate: 5,
    })

    this.player.on('animationcomplete', function(animation, frame){
      if (animation.key == 'destroyed'){
        this.scene.start('game-over-scene')
      }
    }, this)

    // Projectile Animation
    this.anims.create({
      key: 'shooting',
      frames: this.anims.generateFrameNumbers('projectiles',{start:0, end: 4}),
      frameRate: 10,
      repeat: -1
    })

    // Scout destroyed
    this.anims.create({
      key: 'scoutDestroyed',
      frames: this.anims.generateFrameNumbers('scout', { start:1, end: 15}),
      frameRate: 15,
    })
  }

  movePlayer(player, engine, time){
    // Play Engine Animation
    engine.anims.play('engine-idle', true)

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
    if ((this.cursor.space.isDown) && time > this.lastFired){
      const projectile = this.projectiles.get(0, 0, 'projectiles')
      if (projectile){
        projectile.fire(this.player.x, this.player.y)
        this.lastFired = time + 600
        projectile.anims.play('shooting', true)
      }
    }
  }

  spawnMeteor(){
    const config = {
      speed: 30,
      rotation: 0.1
    }
    // @ts-ignore
    const meteor = this.meteor.get(0,0, 'meteor', config)
    
    const positionX = Phaser.Math.Between(50, 350)
    if (meteor) {
      meteor.spawn(positionX)
    }
  }

  spawnScout(){
    const config = {
      speed: 150,
      rotation: 0.1
    }
    // @ts-ignore
    const scout = this.scout.get(0,0, 'scout', config)
    
    const positionX = Phaser.Math.Between(50, 350)
    if (scout) {
      scout.spawn(positionX)
      scout.setFlipY(true)
    }
  }
  
  createBoss(){
    // Add Boss
    this.boss = this.physics.add.sprite(200, 500, 'enemyBoss').setFlipY(true)

    // Set World Bound
    this.boss.setCollideWorldBounds(true)
  }
  
  hitEnemy(projectile, enemy){
    projectile.die()
    enemy.die()
    this.score += 10
  }

  hitScout(projectile, enemy){
    projectile.die()
    enemy.die()
    this.score += 10

  }

  decreaseLife(player, enemy){
    enemy.die()
    this.health--
    if (this.health == 0){
      this.player.anims.play("destroyed", true)
      this.engine.setVisible(false)
    }

  }
}