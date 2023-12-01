import Phaser from 'phaser'
export default class boss extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, texture){
        super (scene, x ,y, texture)
        this.scene = scene
    }
    spawn(positionX){
        this.setPosition(positionX, 200)
        this.setActive(true)
        this.setVisible(true)
    }

    die(){
        this.destroy()
    }

    update(time){
      // Move boss left and right
      if(this.x >= 350){
        this.setVelocityX(-100)
      } else if (this.x <= 50){
        this.setVelocityX(100)
      }
      
    }
}