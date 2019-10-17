"use strict";
require("../assets/scss/styles.css");
const Dot_1 = require("./Dot");
const Snake_1 = require("./Snake");
const Ellipse_1 = require("./Ellipse");
class Dotter {
    constructor() {
        this.dots = [];
    }
    main() {
        this.initDomReferences();
        this.prepareCanvasElement();
        this.initCanvasHandles();
        // this.runDotExchange();
        this.runSpherePulse();
    }
    runSpherePulse() {
        let circleDiameter = 600;
        let r = circleDiameter / 2;
        let step = 25;
        let generateEllipses = () => {
            let result = [];
            for (let i = step, id = 0; i < circleDiameter; i += step, id++) {
                let ellipse = new Ellipse_1.Ellipse(i - circleDiameter / 2, 0, step * 1.8, Math.sqrt((r * r) - ((r - i) * (r - i))), id);
                result.push(ellipse);
            }
            return result;
        };
        let drawEllipses = (ellipses) => {
            for (let ellipse of ellipses) {
                ellipse.drawEllipse(this.ctx);
            }
        };
        let ellipses = generateEllipses();
        this.ctx.translate(this.canvasElement.width / 2, this.canvasElement.height / 2);
        this.ctx.rotate(Math.PI * 4 / 3.2);
        setInterval(() => {
            this.ctx.clearRect(-this.canvasElement.width, -this.canvasElement.height, this.canvasElement.width * 2, this.canvasElement.height * 2);
            drawEllipses(ellipses);
        }, 17);
    }
    moveX(x, axisLength) {
        return x + (this.canvasElement.width / 2) - axisLength / 2;
    }
    generateDots() {
        let rowHeight = this.canvasElement.height / 50;
        this.rectSize = rowHeight;
        this.snake = new Snake_1.Snake(50, Math.round(this.canvasElement.width / rowHeight));
        for (let row = 0, y = 0; y < this.canvasElement.height; y += rowHeight, row++) {
            this.dots[row] = [];
            for (let column = 0, x = 0; x < this.canvasElement.width; x += this.rectSize, column++) {
                this.dots[row][column] = new Dot_1.Dot(row, column);
            }
        }
    }
    drawDots() {
        this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        let margin = this.rectSize - (this.rectSize * .7);
        for (let row = 0; row < this.dots.length; row++) {
            for (let column = 0; column < this.dots[0].length; column++) {
                this.ctx.fillStyle = 'rgb(' + 150 + ',' + 50 + ',' + 50 + ')';
                this.ctx.fillRect((column * this.rectSize) + margin, (row * this.rectSize) + margin, this.rectSize - margin, this.rectSize - margin);
            }
        }
        for (let snakePart of this.snake.body) {
            this.ctx.fillStyle = 'rgb(' + 255 + ',' + 150 + ',' + 150 + ')';
            this.ctx.fillRect((snakePart.column * this.rectSize) + margin, (snakePart.row * this.rectSize) + margin, this.rectSize - margin, this.rectSize - margin);
        }
    }
    runDotExchange() {
        this.generateDots();
        setInterval(() => {
            this.drawDots();
            // let getRandomBetween = (min: number, max: number) => {
            //     return Math.round(Math.random() * (max - min) + min);
            // };
            // let randomDot: Dot = this.dots[getRandomBetween(0, this.dots.length)][getRandomBetween(0, this.dots[0].length)];
            // randomDot.isInTransit = true;
            //
            // let randomDot2: Dot = this.dots[getRandomBetween(0, this.dots.length)][getRandomBetween(0, this.dots[0].length)];
            // randomDot2.isInTransit = false;
        }, 100);
    }
    initDomReferences() {
        this.canvasElement = document.getElementById(Dotter.canvas_id);
        this.outerLimitsElement = document.getElementById(Dotter.outer_limits_id);
    }
    prepareCanvasElement() {
        this.outerLimitsRect = this.outerLimitsElement.getBoundingClientRect();
        this.canvasElement.width = this.outerLimitsRect.width;
        this.canvasElement.height = this.outerLimitsRect.height;
    }
    initCanvasHandles() {
        this.ctx = this.canvasElement.getContext("2d");
        this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }
}
Dotter.canvas_id = 'dotter-canvas';
Dotter.outer_limits_id = 'outer-limits';
(() => {
    const dotter = new Dotter();
    dotter.main();
})();
//# sourceMappingURL=dotter.js.map