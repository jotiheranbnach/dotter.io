export class Vector {
    deltaX: number;
    deltaY: number;

    constructor(deltaX: number, deltaY: number) {
        this.deltaX = deltaX;
        this.deltaY = deltaY;
    }

    factorize(factor: number) {
        this.deltaX *= factor;
        this.deltaY *= factor;
    }
}
