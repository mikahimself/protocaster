import {Game} from "./game.js";

class Main {
  private _game: Game;

  constructor(game: Game) {
    this._game = game;
  }

  public setup() {
    this.gameloop();
  }

  private gameloop() {
    requestAnimationFrame(this.gameloop.bind(this));
    this._game.render();
  }
}

window.onload = () => {
  const main = new Main(new Game());
  main.setup();
};