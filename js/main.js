import { Game } from "./game.js";
var Main = /** @class */ (function () {
    function Main(game) {
        this._game = game;
    }
    Main.prototype.setup = function () {
        this.gameloop();
    };
    Main.prototype.gameloop = function () {
        requestAnimationFrame(this.gameloop.bind(this));
        this._game.render();
    };
    return Main;
}());
window.onload = function () {
    var main = new Main(new Game());
    main.setup();
};
//# sourceMappingURL=main.js.map