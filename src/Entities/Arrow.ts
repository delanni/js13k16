import {Component} from "../Component";
import {EntityDrawer} from "../Components/EntityDrawer";
import {ComponentKey} from "../ComponentKey";
import {Drawable} from "../Traits/Drawable";
import {Entity} from "../Entity";
import {Vector2} from "../Math/Vector";

export class Arrow<T> extends Entity implements Drawable {
    public children: Entity[];
    public parent: Entity;

    public drawOnCanvas(ctx: CanvasRenderingContext2D) {
        let vector = this.getter(this.component);
        // ctx.fillStyle = this.color;
        // ctx.fillRect(0,0,vector.x, vector.y);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(vector.x, vector.y);
        ctx.stroke();
    }

    constructor(public component: T, public getter: (component:T)=>Vector2, public color: string) {
        super("Arrow");
        this.children = [];

        let drawerComponentKey = EntityDrawer.componentKey;
        let drawer = new EntityDrawer(this);
        this.setComponentValue(drawerComponentKey, drawer);
    }
}
