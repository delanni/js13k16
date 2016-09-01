import {BoundingBox} from "../Math/BoundingBox";
import {HasBoundingBox} from "../Traits/HasBoundingBox";
import {ComponentKey} from "../ComponentKey";
import {Component} from "../Component";
import {Drawable} from "../Traits/Drawable";
import {EntityDrawer} from "../Components/EntityDrawer";
import {Entity} from "../Entity";
import {Vector2} from "../Math/Vector";

export class Pixel extends Entity implements Drawable, HasBoundingBox {
    size: number;
    position: Vector2;

    public drawOnCanvas(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.fillStyle = "#b0aa40";
        ctx.fillRect(0, 0, this.size, this.size);
        ctx.restore();
    }

    getBoundingBox(): BoundingBox {
        return null;
    }
    
    constructor() {
        super("Pixel");

        let drawerComponentKey = ComponentKey.get("drawer");
        let drawer = new EntityDrawer(this);
        var drawerComponent = new Component("pixel-drawer", drawerComponentKey, drawer);
        this.addComponent(drawerComponent);

        this.size = 10;
        this.position = new Vector2(100,200);
    }
}
