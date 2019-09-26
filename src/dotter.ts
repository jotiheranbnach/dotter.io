import "../assets/scss/styles.css";
import {Dot} from "./Dot";
import {Snake} from "./Snake";
import {Ellipse} from "./Ellipse";

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

        // this.runDotExchange();
        this.runSpherePulse();
    }

    private runSpherePulse() {
        let circleDiameter = 600;
        let r = circleDiameter / 2;
        let step = 25;

        let generateEllipses = (): Ellipse[] => {
            let result: Ellipse[] = [];
            for (let i = step, id = 0; i < circleDiameter; i += step, id++) {
                let ellipse: Ellipse = new Ellipse(
                    i - circleDiameter / 2,
                    0,
                    step * 1.8,
                    Math.sqrt((r * r) - ((r - i) * (r - i))),
                    id,
                );
                result.push(ellipse);
            }
            return result;
        };

        let drawEllipses = (ellipses: Ellipse[]) => {
            for (let ellipse of ellipses) {
                ellipse.drawEllipse(this.ctx);
            }
        };

        let ellipses: Ellipse[] = generateEllipses();

        this.ctx.translate(this.canvasElement.width / 2, this.canvasElement.height / 2);
        this.ctx.rotate(Math.PI * 4 / 3.2);

        setInterval(() => {
            this.ctx.clearRect(
                -this.canvasElement.width,
                -this.canvasElement.height,
                this.canvasElement.width * 2,
                this.canvasElement.height * 2
            );
            // this.ctx.save();
            drawEllipses(ellipses);
            // this.ctx.restore();
        }, 17);

    }

    moveX(x: number, axisLength: number): number {
        return x + (this.canvasElement.width / 2) - axisLength / 2;
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
