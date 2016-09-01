import {Entity} from "./Entity";

export abstract class System {
    entityPredicate?: (entity: Entity) => boolean;
    abstract initialize(): void;
    beforeRun(timeSlice: number): void {

    }
    afterRun?(timeSlice: number): void {

    }
    applyToEntity(timeSlice: number, entity: Entity): void {

    }
    name: string;
}
