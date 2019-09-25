import "../assets/scss/styles.css";
import {Dot} from "./Dot";
import {Snake} from "./Snake";

class Dotter {
    private static canvas_id: string = 'dotter-canvas';
    private static outer_limits_id: string = 'outer-limits';

    private canvasElement: HTMLCanvasElement;
    private outerLimitsElement: HTMLCanvasElement;
    private outerLimitsRect: ClientRect;
    private ctx: CanvasRenderingContext2D;
    private dots: Dot[][] = [];
    private rectSize: number;
    private snake: Snake;

    main() {
        this.initDomReferences();
        this.prepareCanvasElement();
        this.initCanvasHandles();
        this.runDotExchange();
    }

    generateDots() {
        let rowHeight: number = this.canvasElement.height / 50;
        this.rectSize = rowHeight;
        this.snake = new Snake(50, Math.round(this.canvasElement.width / rowHeight));

        for (let row = 0, y = 0; y < this.canvasElement.height; y += rowHeight, row++) {
            this.dots[row] = [];
            for (let column = 0, x = 0; x < this.canvasElement.width; x += this.rectSize, column++) {
                this.dots[row][column] = new Dot(row, column);
            }
        }
    }

    drawDots() {
        this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        let margin: number = this.rectSize - (this.rectSize * .7);

        for (let row = 0; row < this.dots.length; row++) {
            for (let column = 0; column < this.dots[0].length; column++) {
                this.ctx.fillStyle = 'rgb(' + 150 + ',' + 50 + ',' + 50 + ')';
                this.ctx.fillRect(
                    (column * this.rectSize) + margin,
                    (row * this.rectSize) + margin,
                    this.rectSize - margin,
                    this.rectSize - margin
                );
            }
        }

        for (let snakePart of this.snake.body) {
            this.ctx.fillStyle = 'rgb(' + 255 + ',' + 150 + ',' + 150 + ')';
            this.ctx.fillRect(
                (snakePart.column * this.rectSize) + margin,
                (snakePart.row * this.rectSize) + margin,
                this.rectSize - margin,
                this.rectSize - margin
            );
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

    private initDomReferences() {
        this.canvasElement = <HTMLCanvasElement>document.getElementById(Dotter.canvas_id);
        this.outerLimitsElement = <HTMLCanvasElement>document.getElementById(Dotter.outer_limits_id);
    }

    private prepareCanvasElement() {
        this.outerLimitsRect = this.outerLimitsElement.getBoundingClientRect();
        this.canvasElement.width = this.outerLimitsRect.width;
        this.canvasElement.height = this.outerLimitsRect.height;
    }

    private initCanvasHandles() {
        this.ctx = this.canvasElement.getContext("2d");
        this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }
}

(() => {
    const dotter: Dotter = new Dotter();
    dotter.main();
})();
