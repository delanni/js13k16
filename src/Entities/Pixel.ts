import {TimedVector2} from "../Math/TimedVector";
import {PhysicsSystem} from "../Systems/PhysicsSystem";
import {BoundingBox} from "../Math/BoundingBox";
import {HasBoundingBox} from "../Traits/HasBoundingBox";
import {ComponentKey} from "../ComponentKey";
import {Component} from "../Component";
import {Drawable} from "../Traits/Drawable";
import {EntityDrawer} from "../Components/EntityDrawer";
import {Entity} from "../Entity";
import {Vector2} from "../Math/Vector";

export interface PixelOptions {
    size?: number,
    x?: number,
    y?: number,
    color?: string
}

export class Pixel extends Entity implements Drawable, HasBoundingBox {
    size: number;
    public color: string;
    public children: Entity[];
    public parent: Entity;

    public drawOnCanvas(ctx: CanvasRenderingContext2D) {
        var position = this.getComponentValue(PhysicsSystem.positionComponentKey);
        ctx.translate(position.x, position.y);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
    }

    getBoundingBox(): BoundingBox {
        return null;
    }

    static defaults: PixelOptions = {
        size: 10,
        x:0,
        y:0,
        color: "#b0aa40"
    }

    constructor(pixelOptions?: PixelOptions) {
        super("Pixel");

        let options: PixelOptions = (<any>Object).assign(Pixel.defaults, pixelOptions || {});

        this.children = [];

        let drawerComponentKey = EntityDrawer.componentKey;
        let drawer = new EntityDrawer(this);
        this.setComponentValue(drawerComponentKey, drawer);

        this.size = options.size;
        this.color = options.color;

        // setInterval(()=>{
        //     let xy = (<any>window).direction;
        //     (<any>window).direction = {x:0, y:0};
        //     this.setComponentValue(PhysicsSystem.forceComponentKey, new TimedVector2(xy.x, xy.y, 50))
        // }, 50);

        this.setComponentValue(PhysicsSystem.positionComponentKey, new Vector2(options.x, options.y));
        this.setComponentValue(PhysicsSystem.forceComponentKey, new TimedVector2(0, 0, 10))
        this.setComponentValue(PhysicsSystem.massComponentKey, this.size * this.size);
        this.setComponentValue(PhysicsSystem.speedComponentKey, new Vector2(0, 0));
        this.setComponentValue(PhysicsSystem.accelerationComponentKey, new Vector2(0, 0));
    }
}
