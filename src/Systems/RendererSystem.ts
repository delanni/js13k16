import {EntityDrawer} from "../Components/EntityDrawer";
import {ComponentKey} from "../ComponentKey";
import {Component} from "../Component";
import {Entity} from "../Entity";
import {System} from "../System";

const CLEAR_COLOR = "#000000"

export class RendererSystem implements System {
    private drawerComponentKey: ComponentKey<EntityDrawer>;
    canvasHeight: number;
    canvasWidth: number;
    name: string;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    public initialize() {
        this.ctx = this.canvas.getContext("2d");

        this.drawerComponentKey = EntityDrawer.componentKey;

        console.log(`RendererSystem ${this.name} initialized.`);
    }

    public beforeRun(timeSlice: number) {
        this.ctx.fillStyle = CLEAR_COLOR;
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    public applyToEntity(timeSlice: number, entity: Entity) {
        let drawerComponent = entity.getComponent(this.drawerComponentKey);
        if (drawerComponent.hasValue) {
            let drawer = drawerComponent.value;
            if (drawer.isVisible) {
                drawer.drawTo(this.ctx);
            }
        }
    }

    public entityPredicate(entity: Entity): boolean {
        return true;
    }

    public constructor(name: string, targetCanvas: HTMLCanvasElement) {
        this.name = name;
        this.canvas = targetCanvas;
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;
    }
}
