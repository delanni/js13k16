import {ComponentKey} from "../ComponentKey";
import {Entity} from "../Entity";
import {Drawable} from "../Traits/Drawable";

export interface DrawableEntity extends Entity, Drawable {

}

export class EntityDrawer {
    public static componentKey: ComponentKey<EntityDrawer> = ComponentKey.create<EntityDrawer>("drawer", null);

    public isVisible: boolean;

    public drawTo(ctx: CanvasRenderingContext2D){
        ctx.save();
        this.entity.drawOnCanvas(ctx);
        this.entity.children.forEach(c => {
            let drawer = c.getComponentValue(EntityDrawer.componentKey);
            if (drawer && drawer.isVisible){
                drawer.drawTo(ctx);
            }
        });
        ctx.restore();
    }

    constructor(private entity: DrawableEntity){
        this.isVisible = true;
    }
}
