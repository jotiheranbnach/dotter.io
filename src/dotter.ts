import "../assets/scss/styles.css";

class Dotter {
    private static canvas_id: string = 'dotter-canvas';
    private static outer_limits_id: string = 'outer-limits';

    private canvasElement: HTMLCanvasElement;
    private outerLimitsElement: HTMLCanvasElement;
    private outerLimitsRect: ClientRect;
    private ctx: CanvasRenderingContext2D;

    main() {
        this.initDomReferences();
        this.prepareCanvasElement();
        this.initCanvasHandles();
        this.drawDotGrid();
    }

    drawDotGrid() {
        let isRed: boolean = false;
        let maxSquareSize: number = 50;
        setInterval(() => {
            for (let i = 0; i < 100; i++) {
                isRed = Math.random() >= 0.5;
                let squareSize = Math.random() * maxSquareSize;
                let x = Math.random() * this.outerLimitsRect.width;
                let y = Math.random() * this.outerLimitsRect.height;
                let gb: number = Math.round(Math.random() * 200);
                this.ctx.fillStyle = 'rgb(' + 80 + ',' + gb + ',' + gb + ')';
                this.ctx.fillRect(x, y, squareSize, squareSize);
            }
        }, 1);
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
