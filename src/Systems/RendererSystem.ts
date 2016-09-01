import {Component} from "../Component";
import {Entity} from "../Entity";
import {System} from "../System";

const CLEAR_COLOR = "#000000"

export class RendererSystem implements System {
    entityContainer: Entity[];
    canvasHeight: number;
    canvasWidth: number;
    name: string;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    public initialize() {
        this.ctx = this.canvas.getContext("2d");

        console.log(`RendererSystem ${this.name} initialized.`);
    }

    public run(timeSlice: number) {
        this.ctx.fillStyle = CLEAR_COLOR;
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

        let visibilityKey = Component.KEYS.VISIBILITY;
        this.entityContainer.forEach(entity => {
            entity.getComponent(visibilityKey);
        });
    }

    public constructor(name: string, targetCanvas: HTMLCanvasElement, entityContainer: Entity[]) {
        this.name = name;
        this.canvas = targetCanvas;
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;
        this.entityContainer = entityContainer;
    }
}
