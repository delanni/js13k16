import { Vector2 } from "./Vector";

export interface BoundingBox {
    hasOverlapWith(other: BoundingBox): boolean;
    type: string;
}

export class AABB implements BoundingBox {
    public type: string;

    constructor(public center: Vector2, public topRight: Vector2) {
        this.type = "AABB";
    }

    get width(): number {
        return this.topRight.x * 2;
    }

    get height(): number {
        return this.topRight.y * 2;
    }

    get top(): number {
        return this.center.y + this.topRight.y;
    }
    get bottom(): number {
        return this.center.y - this.topRight.y;
    }
    get left(): number {
        return this.center.x - this.topRight.x;
    }

    get right(): number {
        return this.center.x + this.topRight.x;
    }

    hasOverlapWith(boundingBox: BoundingBox): boolean {
        switch (boundingBox.type){
            case "AABB": return this.hasOverlapWithAABB(<AABB>boundingBox);
            default: throw Error("Unimplemented collision check");
        }
    }

    hasOverlapWithAABB(other: AABB): boolean {
        // return (this.left < other.right && this.right > other.right) &&
        //     (this.top > other.top && this.bottom < other.top);
    }
}
