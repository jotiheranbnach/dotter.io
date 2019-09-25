import {Vector} from "./Vector";

export class Dot {
    row: number;
    column: number;
    isInTransit: boolean;
    transitVector: Vector;

    constructor(row: number, column: number, isInTransit: boolean = false) {
        this.row = row;
        this.column = column;
        this.isInTransit = isInTransit;
    }
}
