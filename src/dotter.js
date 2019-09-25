"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../assets/scss/styles.css");
var Dot_1 = require("./Dot");
var Snake_1 = require("./Snake");
var Dotter = /** @class */ (function () {
    function Dotter() {
        this.dots = [];
    }
    Dotter.prototype.main = function () {
        this.initDomReferences();
        this.prepareCanvasElement();
        this.initCanvasHandles();
        this.runDotExchange();
    };
    Dotter.prototype.generateDots = function () {
        var rowHeight = this.canvasElement.height / 50;
        this.rectSize = rowHeight;
        this.snake = new Snake_1.Snake(50, Math.round(this.canvasElement.width / rowHeight));
        for (var row = 0, y = 0; y < this.canvasElement.height; y += rowHeight, row++) {
            this.dots[row] = [];
            for (var column = 0, x = 0; x < this.canvasElement.width; x += this.rectSize, column++) {
                this.dots[row][column] = new Dot_1.Dot(row, column);
            }
        }
    };
    Dotter.prototype.drawDots = function () {
        this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        var margin = this.rectSize - (this.rectSize * .7);
        for (var row = 0; row < this.dots.length; row++) {
            for (var column = 0; column < this.dots[0].length; column++) {
                this.ctx.fillStyle = 'rgb(' + 150 + ',' + 50 + ',' + 50 + ')';
                this.ctx.fillRect((column * this.rectSize) + margin, (row * this.rectSize) + margin, this.rectSize - margin, this.rectSize - margin);
            }
        }
        for (var _i = 0, _a = this.snake.body; _i < _a.length; _i++) {
            var snakePart = _a[_i];
            this.ctx.fillStyle = 'rgb(' + 255 + ',' + 150 + ',' + 150 + ')';
            this.ctx.fillRect((snakePart.column * this.rectSize) + margin, (snakePart.row * this.rectSize) + margin, this.rectSize - margin, this.rectSize - margin);
        }
    };
    Dotter.prototype.runDotExchange = function () {
        var _this = this;
        this.generateDots();
        setInterval(function () {
            _this.drawDots();
            // let getRandomBetween = (min: number, max: number) => {
            //     return Math.round(Math.random() * (max - min) + min);
            // };
            // let randomDot: Dot = this.dots[getRandomBetween(0, this.dots.length)][getRandomBetween(0, this.dots[0].length)];
            // randomDot.isInTransit = true;
            //
            // let randomDot2: Dot = this.dots[getRandomBetween(0, this.dots.length)][getRandomBetween(0, this.dots[0].length)];
            // randomDot2.isInTransit = false;
        }, 100);
    };
    Dotter.prototype.initDomReferences = function () {
        this.canvasElement = document.getElementById(Dotter.canvas_id);
        this.outerLimitsElement = document.getElementById(Dotter.outer_limits_id);
    };
    Dotter.prototype.prepareCanvasElement = function () {
        this.outerLimitsRect = this.outerLimitsElement.getBoundingClientRect();
        this.canvasElement.width = this.outerLimitsRect.width;
        this.canvasElement.height = this.outerLimitsRect.height;
    };
    Dotter.prototype.initCanvasHandles = function () {
        this.ctx = this.canvasElement.getContext("2d");
        this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    };
    Dotter.canvas_id = 'dotter-canvas';
    Dotter.outer_limits_id = 'outer-limits';
    return Dotter;
}());
(function () {
    var dotter = new Dotter();
    dotter.main();
})();
//# sourceMappingURL=dotter.js.map