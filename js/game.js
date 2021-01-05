import map from "./map.js";
import { Player } from './player.js';
var Game = /** @class */ (function () {
    function Game() {
        var _this = this;
        this.height = 480; //window.innerHeight;
        this.width = 640; //window.innerWidth;
        this.blockSize = 32;
        this.rows = this.height / this.blockSize;
        this.cols = this.width / this.blockSize;
        this.downPressed = false;
        this.upPressed = false;
        this.leftPressed = false;
        this.rightPressed = false;
        this.keyDownHandler = function (event) {
            if (event.key === 'ArrowDown') {
                _this.downPressed = true;
            }
            if (event.key === 'ArrowUp') {
                _this.upPressed = true;
            }
            if (event.key === 'ArrowRight') {
                _this.rightPressed = true;
            }
            if (event.key === 'ArrowLeft') {
                _this.leftPressed = true;
            }
        };
        this.keyUpHandler = function (event) {
            if (event.key === 'ArrowDown') {
                _this.downPressed = false;
            }
            if (event.key === 'ArrowUp') {
                _this.upPressed = false;
            }
            if (event.key === 'ArrowRight') {
                _this.rightPressed = false;
            }
            if (event.key === 'ArrowLeft') {
                _this.leftPressed = false;
            }
        };
        this.canvas = document.getElementById('raycokes');
        this.canvas.height = this.height;
        this.canvas.width = this.width;
        this.ctx = this.canvas.getContext('2d');
        this.plr = new Player(48, 48);
        this.DrawMap();
        this.SetControls();
    }
    Game.prototype.render = function () {
        //this.DrawMap();
        this.GetControls();
        this.DrawMap();
        this.DrawPlayer();
        this.plr.drawPlayer(this.ctx);
    };
    Game.prototype.GetControls = function () {
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
    };
    Game.prototype.SetControls = function () {
        document.addEventListener('keydown', this.keyDownHandler);
        document.addEventListener('keyup', this.keyUpHandler);
        //window.addEventListener('keyup', this.keyUpHandler, true);
        //UpHandler, false);
    };
    Game.prototype.DrawMap = function () {
        this.ctx.fillStyle = 'rgba(255, 255, 255)';
        this.ctx.fillRect(0, 0, this.width, this.height);
        for (var i = 0; i < map.length; i++) {
            var x = i % this.cols;
            var y = Math.floor(i / this.cols);
            this.DrawTile(map[i], x, y);
        }
    };
    Game.prototype.DrawPlayer = function () {
    };
    Game.prototype.DrawTile = function (tileID, posX, posY) {
        switch (tileID) {
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
    };
    return Game;
}());
export { Game };
export default Game;
//# sourceMappingURL=game.js.map