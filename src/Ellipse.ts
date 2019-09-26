export class Ellipse {
    private x: number;
    private movementX: number;
    private y: number;
    private radiusX: number;
    private radiusY: number;
    private id: number;
    private red: number = 0;

    constructor(x: number, y: number, radiusX: number, radiusY: number, id: number) {
        this.x = x;
        this.movementX = this.x;
        this.y = y;
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        this.id = id;

        this.startMovement();
    }

    startMovement() {
        setTimeout(() => {
            let interval1 = setInterval(() => {
                let delta: number = -1;
                let deltaMax: number = -30;
                let toLeft: boolean = true;
                this.movementX = this.x;

                let interval2 = setInterval(() => {
                    if (toLeft) {
                        delta--;
                    } else {
                        delta += .5;
                    }
                    this.movementX = this.x + delta;

                    if (deltaMax === delta) {
                        toLeft = !toLeft;
                    }

                    if (Math.abs(deltaMax - delta) < 7) {
                        this.red = 1 - Math.abs(deltaMax - delta) / 10;
                    } else {
                        this.red = 0;
                    }
                    if (delta === 0) {
                        clearInterval(interval2);
                    }
                }, 17);
            }, 4000);
        }, (23 - this.id + 1) * 100);
    }

    drawEllipse(ctx: CanvasRenderingContext2D) {
        const gradient: CanvasGradient = ctx.createLinearGradient(
            this.movementX,
            this.y,
            this.radiusX,
            this.radiusY,
        );
        gradient.addColorStop(0, 'hsl(0, 0%, 10%)');
        gradient.addColorStop(1, 'hsl(166, 0%, 30%)');

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.ellipse(this.movementX, this.y, this.radiusX, this.radiusY, 0, 0, 2 * Math.PI);

        ctx.fill();
        if (this.red > 0) {
            ctx.strokeStyle = 'rgba(255,80,80,' + this.red + ')';
            ctx.stroke();
        }
    }
}
