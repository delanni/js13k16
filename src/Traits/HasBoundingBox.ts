import {BoundingBox} from "../Math/BoundingBox";

export interface HasBoundingBox {
    getBoundingBox(): BoundingBox;
}
