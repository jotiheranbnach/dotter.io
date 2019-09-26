"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../assets/scss/styles.css");
var Dot_1 = require("./Dot");
var Snake_1 = require("./Snake");
var Ellipse_1 = require("./Ellipse");
var Dotter = /** @class */ (function () {
    function Dotter() {
        this.dots = [];
    }
    Dotter.prototype.main = function () {
        this.initDomReferences();
        this.prepareCanvasElement();
        this.initCanvasHandles();
        // this.runDotExchange();
        this.runSpherePulse();
    };
    Dotter.prototype.runSpherePulse = function () {
        var _this = this;
        var circleDiameter = 600;
        var r = circleDiameter / 2;
        var step = 25;
        var generateEllipses = function () {
            var result = [];
            for (var i = step, id = 0; i < circleDiameter; i += step, id++) {
                var ellipse = new Ellipse_1.Ellipse(i - circleDiameter / 2, 0, step * 1.8, Math.sqrt((r * r) - ((r - i) * (r - i))), id);
                result.push(ellipse);
            }
            return result;
        };
        var drawEllipses = function (ellipses) {
            for (var _i = 0, ellipses_1 = ellipses; _i < ellipses_1.length; _i++) {
                var ellipse = ellipses_1[_i];
                ellipse.drawEllipse(_this.ctx);
            }
        };
        var ellipses = generateEllipses();
        this.ctx.translate(this.canvasElement.width / 2, this.canvasElement.height / 2);
        this.ctx.rotate(Math.PI * 4 / 3.2);
        setInterval(function () {
            _this.ctx.clearRect(-_this.canvasElement.width, -_this.canvasElement.height, _this.canvasElement.width * 2, _this.canvasElement.height * 2);
            // this.ctx.save();
            drawEllipses(ellipses);
            // this.ctx.restore();
        }, 17);
    };
    Dotter.prototype.moveX = function (x, axisLength) {
        return x + (this.canvasElement.width / 2) - axisLength / 2;
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