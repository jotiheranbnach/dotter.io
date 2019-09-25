"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../assets/scss/styles.css");
var Dotter = /** @class */ (function () {
    function Dotter() {
    }
    Dotter.prototype.main = function () {
        this.initDomReferences();
        this.prepareCanvasElement();
        this.initCanvasHandles();
        this.drawDotGrid();
    };
    Dotter.prototype.drawDotGrid = function () {
        var _this = this;
        var isRed = false;
        var maxSquareSize = 50;
        setInterval(function () {
            for (var i = 0; i < 100; i++) {
                isRed = Math.random() >= 0.5;
                var squareSize = Math.random() * maxSquareSize;
                var x = Math.random() * _this.outerLimitsRect.width;
                var y = Math.random() * _this.outerLimitsRect.height;
                var gb = Math.round(Math.random() * 200);
                _this.ctx.fillStyle = 'rgb(' + 80 + ',' + gb + ',' + gb + ')';
                _this.ctx.fillRect(x, y, squareSize, squareSize);
            }
        }, 1);
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