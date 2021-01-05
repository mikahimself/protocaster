import map from "./map.js";
import { Player } from './player.js';

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private height: number = 480;//window.innerHeight;
  private width: number = 640;//window.innerWidth;
  private blockSize: number = 32;
  private rows: number = this.height / this.blockSize;
  private cols: number = this.width / this.blockSize;
  public plr: Player;
  public downPressed: boolean = false;
  public upPressed: boolean = false;
  public leftPressed: boolean = false;
  public rightPressed: boolean = false;
  public keyDownHandler = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      this.downPressed = true;
    }
    if (event.key === 'ArrowUp') {
      this.upPressed = true;
    }
    if (event.key === 'ArrowRight') {
      this.rightPressed = true;
    }
    if (event.key === 'ArrowLeft') {
      this.leftPressed = true;
    }
  }
  public keyUpHandler = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      this.downPressed = false;
    }
    if (event.key === 'ArrowUp') {
      this.upPressed = false;
    }
    if (event.key === 'ArrowRight') {
      this.rightPressed = false;
    }
    if (event.key === 'ArrowLeft') {
      this.leftPressed = false;
    }
  }

  

  constructor() {
    this.canvas = <HTMLCanvasElement>document.getElementById('raycokes');
    this.canvas.height = this.height;
    this.canvas.width = this.width;
    this.ctx = this.canvas.getContext('2d');
    this.plr = new Player(48, 48);
    this.DrawMap();
    this.SetControls();
  }

  public render(): void {
    //this.DrawMap();
    this.GetControls();
    this.DrawMap();
    this.DrawPlayer();
    this.plr.drawPlayer(this.ctx);
  }

  public GetControls() {
    if (this.downPressed) {
      this.plr.updatePosition(-1);
    }
    if (this.upPressed) {
      this.plr.updatePosition(1);
    }
    if (this.rightPressed) {
      //this.plr.updatePosition(this.plr.speed, 0);
      this.plr.rotate(-1);
    }
    if (this.leftPressed) {
      //this.plr.updatePosition(-this.plr.speed, 0);
      this.plr.rotate(1);
    }
  }

  private SetControls() {
    document.addEventListener('keydown', this.keyDownHandler);
    document.addEventListener('keyup', this.keyUpHandler);
    //window.addEventListener('keyup', this.keyUpHandler, true);
    //UpHandler, false);
  }

  
  
  

  private DrawMap() {
    this.ctx.fillStyle = 'rgba(255, 255, 255)';
    this.ctx.fillRect(0, 0, this.width, this.height);
    

    for (let i = 0; i < map.length; i++) {
      const x = i % this.cols;
      const y = Math.floor(i / this.cols);
      this.DrawTile(map[i], x, y);
    }
  }

  private DrawPlayer() {

  }

  private DrawTile(tileID:number, posX: number, posY: number): void {
    switch(tileID) {
      case 0:
        this.ctx.fillStyle = 'rgba(0,0,0)';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(posX * this.blockSize, posY * this.blockSize, this.blockSize, this.blockSize);
        break;
      case 1:
        this.ctx.fillStyle = 'rgba(255, 0, 0)';
        this.ctx.fillRect(posX * this.blockSize, posY * this.blockSize, this.blockSize, this.blockSize);
        this.ctx.fillStyle = 'rgba(0,0,0)';
        this.ctx.strokeRect(posX * this.blockSize, posY * this.blockSize, this.blockSize, this.blockSize);
        break;
      case 2:
        this.ctx.fillStyle = 'rgba(0, 255, 0)';
        this.ctx.fillRect(posX * this.blockSize, posY * this.blockSize, this.blockSize, this.blockSize);
        this.ctx.fillStyle = 'rgba(0,0,0)';
        this.ctx.strokeRect(posX * this.blockSize, posY * this.blockSize, this.blockSize, this.blockSize);
        break;
      case 3:
        this.ctx.fillStyle = 'rgba(0, 0, 255)';
        this.ctx.fillRect(posX * this.blockSize, posY * this.blockSize, this.blockSize, this.blockSize);
        this.ctx.fillStyle = 'rgba(0,0,0)';
        this.ctx.strokeRect(posX * this.blockSize, posY * this.blockSize, this.blockSize, this.blockSize);
        break;
    }
  }
}

export default Game;