import {Dot} from "./Dot";

export class Snake {
    private static DIRECTION_UP: string = 'up';
    private static DIRECTION_RIGHT: string = 'right';
    private static DIRECTION_LEFT: string = 'down';
    private static DIRECTION_DOWN: string = 'left';

    private readonly rows: number;
    private readonly columns: number;

    direction: string = Snake.DIRECTION_RIGHT;
    body: Dot[];

    constructor(rows: number, columns: number) {
        this.rows = rows;
        this.columns = columns;

        document.addEventListener('keydown', (ev: KeyboardEvent) => {
            switch (ev.key) {
                case 'w':
                    this.direction = Snake.DIRECTION_UP;
                    break;
                case 'd':
                    this.direction = Snake.DIRECTION_RIGHT;
                    break;
                case 's':
                    this.direction = Snake.DIRECTION_DOWN;
                    break;
                case 'a':
                    this.direction = Snake.DIRECTION_LEFT;
                    break;
            }
        });

        this.body = [
            new Dot(15, 13),
            new Dot(15, 12),
            new Dot(15, 11),
            new Dot(15, 10),
            new Dot(15, 9),
            new Dot(15, 8),
            new Dot(15, 7),
            new Dot(15, 6),
            new Dot(15, 5),
            new Dot(15, 4),
            new Dot(15, 3),
        ];

        this.crawl();
    }

    crawl() {
        let interval = setInterval(() => {
            this.body.pop();
            let operation: string = this.direction;
            let isMoved: boolean = true;

            let newHead: Dot = new Dot(this.body[0].row, this.body[0].column);
            switch (operation) {
                case Snake.DIRECTION_UP:
                    isMoved = this.moveUp(newHead);
                    break;
                case Snake.DIRECTION_RIGHT:
                    isMoved = this.moveRight(newHead);
                    break;
                case Snake.DIRECTION_DOWN:
                    isMoved = this.moveDown(newHead);
                    break;
                case Snake.DIRECTION_LEFT:
                    isMoved = this.moveLeft(newHead);
            }
            this.body.unshift(newHead);

            if (false === isMoved) {
                clearInterval(interval);
            }
        }, 100);
    }

    moveUp(bodyPart: Dot) {
        if (bodyPart.row - 1 >= 0) {
            bodyPart.row--;
            return true;
        }
        return false;
    }

    moveRight(bodyPart: Dot) {
        if (bodyPart.column + 1 < this.columns) {
            bodyPart.column++;
            return true;
        }
        return false;
    }

    moveDown(bodyPart: Dot) {
        if (bodyPart.row + 1 < this.rows) {
            bodyPart.row++;
            return true;
        }
        return false;
    }

    moveLeft(bodyPart: Dot) {
        if (bodyPart.column - 1 >= 0) {
            bodyPart.column--;
            return true;
        }
        return false;
    }
}
