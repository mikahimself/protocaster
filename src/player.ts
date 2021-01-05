import map from "./map.js";

export class Player {
  public posX: number;
  public posY: number;
  public dir: number = Math.PI /2;
  public speed = 2.5;
  public rotSpeed = 0.05;
  xOK = false;
  yOK = false;
  playerRad = 8;
  pointerLength = 50;
  mapWidth = 20;
  tileWidth = 32;
  targetPos = { x: 0, y: 0 };
  probDir = 0;

  constructor(x: number, y: number) {
    this.posX = x;
    this.posY = y;
  }

  updatePosition(speed: number): void {
    //console.log(this.checkPositionNew(speed));
    //if (this.checkPosition(speed)) {
    if (this.checkPositionNew(speed)) {
      this.posX += Math.sin(this.dir) * this.speed * speed;
      this.posY += Math.cos(this.dir) * this.speed * speed;
    } else {

      /*if (this.probDir === -1 ) {
        this.posY += Math.cos(this.dir) * this.speed * speed;
      }
      if (this.probDir === 1) {
        this.posY += Math.cos(this.dir) * this.speed * speed;
      }*/
      //console.log("Target: " + this.targetPos.x + ", " + this.targetPos.y  + " Current: (" + Math.floor(this.getGridPosition().x) + "," + this.getGridPosition().y + ") dirvec: " + this.getDirectionVector().x)
      //this.printPosition();
      // console.log()
      // let gridPos = this.getCurrentGridPosition();
      // let mapPosX = this.getMapPosition(Math.floor(gridPos.x + 0.2 * this.getXDir()), gridPos.y);
      // let mapPosY = this.getMapPosition(gridPos.x, Math.floor(gridPos.y + 0.2 * this.getYDir()));
      // console.log(Math.sin(this.dir) + " " + Math.ceil(Math.sin(this.dir)))

      // console.log("GridPos: (" + gridPos.x + ", " + gridPos.y + ")")
      // console.log("Mappos: " + mapPosX + " - " + map[mapPosX]);

      // if (map[mapPosX] === 0) {
      //   this.posX += Math.sin(this.dir) * this.speed * speed;
      // }
      // if (map[mapPosY] === 0) {
      //   this.posY += Math.cos(this.dir) * this.speed * speed;
      // }
           
            
      
      // if (
      //     this.targetPos.x > this.getGridPosition().x && this.getDirectionVector().x < 0 ||
      //     this.targetPos.x < this.getGridPosition().x && this.getDirectionVector().x > 0) {
      //       this.posY += Math.cos(this.dir) * this.speed * speed;
      // }
      // if (this.targetPos.y > this.getGridPosition().y || this.targetPos.y < this.getGridPosition().y) {
      //  //this.posX += Math.sin(this.dir) * this.speed * speed;
      // }
    }
  }

  printPosition() {
    console.log("Target: (" + this.targetPos.x + ", " + this.targetPos.y + ")");
    console.log("Current: (" +  this.getCurrentGridPosition().x + ", " + this.getCurrentGridPosition().y + ")");
    console.log("Direction: (" + this.getDirectionVector().x + ", " + this.getDirectionVector().y + ")");
  }

  getXDir() {
    return Math.sin(this.dir) > 0 ? 1 : -1;
  }
  getYDir() {
    return Math.cos(this.dir) > 0 ? 1 : -1;
  }

  getMapPosition(x, y) {
    return Math.floor(x + this.mapWidth * y);
  }

  getCurrentGridPosition() {
    return { x: Math.floor((this.posX / 32 )), y: Math.floor(this.posY / 32)};
  }
  getGridPosition(dx:number, dy:number) {
    return { x: Math.floor((dx / 32 )), y: Math.floor(dy / 32)};
  }

  getDirectionVector() {
    return { x: Math.sin(this.dir), y: Math.cos(this.dir) };
  }

  rotate(dir: number) {
    this.dir += this.rotSpeed * dir;
  }

  checkPositionNew(direction: number) {
    
    let canMove = true;
    let rayDir = this.dir - Math.PI / 2;
    this.probDir = 0;
    let currGridPos = this.getCurrentGridPosition();
    let canMoveX = true;
    let canMoveY = true;

    for (let i = 0; i < 30; i++) {
      let dirX = Math.sin(rayDir + i * (Math.PI / 30));
      let dirY = Math.cos(rayDir + i * (Math.PI / 30));

      let newPosX = this.posX + dirX * (this.playerRad + this.speed + this.speed) * direction;
      let newPosY = this.posY + dirY * (this.playerRad  + this.speed + this.speed) * direction;
      let gridPosNewXoldY = this.getGridPosition(newPosX, this.posY);
      let gridPosNewYOldX = this.getGridPosition(this.posX, newPosY);
      //let mapPosX = this.getMapPosition(gridPos.x, gridPos.y);
      let mapPosXoldY = this.getMapPosition(gridPosNewXoldY.x, gridPosNewXoldY.y);
      
      let mapPosYoldX = this.getMapPosition(gridPosNewYOldX.x, gridPosNewYOldX.y);
      
      //console.log("GridPos: (" + gridPosNewXoldY.x + ", " + gridPosNewXoldY.y + ")" + "  " + "mapPosX: " + mapPosXoldY + ": " + map[mapPosXoldY]);
      
      
      if (map[mapPosXoldY] !== 0 || map[mapPosYoldX] !== 0 || (map[mapPosXoldY] !== 0 && map[mapPosYoldX] !== 0)) {
        canMove = false;
        if (map[mapPosXoldY] !== 0) {
          
          canMoveX =false;
        }
        if (map[mapPosYoldX] !== 0 ) {
          canMoveY = false;
        }

          //break;
      }
    }
      
      //console.log("Can move? " + canMove);
      
    
    //console.log("Probdir: " + this.probDir);
    //console.log("can move: " + canMove);
    //if (this.probDir === -1) {
    /*console.log("Can move: " + canMove)
    console.log("Can move X: " + canMoveX)
    console.log("Can move Y: " + canMoveY)*/

      if (!canMove && canMoveY) {
        this.posY += Math.cos(this.dir) * this.speed * direction;
    } 
    if (!canMove && canMoveX) {
      this.posX += Math.sin(this.dir) * this.speed * direction;
    }
    return canMove;
  }

  


  public drawPlayer(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.posX, this.posY, this.playerRad, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'rgba(255, 255, 0)';
    ctx.stroke();

    /*ctx.beginPath();
    ctx.moveTo(this.posX, this.posY);
    ctx.lineTo(this.posX + Math.sin(this.dir) * this.pointerLength, this.posY + Math.cos(this.dir) * this.pointerLength);
    ctx.stroke();*/

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 128, 0)';
    ctx.moveTo(this.posX, this.posY);
    ctx.lineTo(this.posX + Math.sin(this.dir) * (2.5 + this.playerRad * 1), this.posY + Math.cos(this.dir) * this.playerRad * 1);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(0, 0, 0)';

    /*for (let i = 0; i < 20; i++) {
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 128, 0)';
      ctx.moveTo(this.posX, this.posY);
      ctx.lineTo(this.posX + Math.sin(this.dir + (i * (Math.PI / 10))) * (30 + this.playerRad * 1), this.posY + Math.cos(this.dir + (i * (Math.PI / 10))) * (30 + this.playerRad) * 1);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(0, 0, 0)';
    }*/
    
    ctx.beginPath();
    ctx.moveTo(this.posX, this.posY);
    ctx.lineTo(this.posX + Math.sin(this.dir + Math.PI / 4) * this.pointerLength, this.posY + Math.cos(this.dir + Math.PI / 4) * this.pointerLength);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(this.posX, this.posY);
    ctx.lineTo(this.posX + Math.sin(this.dir - Math.PI / 4) * this.pointerLength, this.posY + Math.cos(this.dir - Math.PI / 4) * this.pointerLength);
    ctx.stroke();
  }
}

export default Player;