import {Drawable} from "../Traits/Drawable";

export class EntityDrawer {
    public isVisible: boolean;

    public drawTo(ctx: CanvasRenderingContext2D){
        this.entity.drawOnCanvas(ctx);
    }

    constructor(private entity: Drawable){
        this.isVisible = true;
    }
}
