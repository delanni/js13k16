import {World} from "./World";
import {Entity} from "./Entity";
import {System} from "./System";

export interface IScene {
    entities: Entity[],
    initialize(world: World): void,
    beforeSystem(system: System): void,
    afterSystem(system: System): void,
    beforeFrame?(delta: number): void,
    afterFrame?(delta: number): void,
    beforeMount(world: World): void,
    beforeUnmount(world: World): void,
    destroy(): void
}

export interface SceneHandlers {
    initialize?(world: World): void,
    beforeSystem?(system: System): void,
    afterSystem?(system: System): void,
    beforeFrame?(delta: number): void,
    afterFrame?(delta: number): void,
    beforeMount?(world: World): void,
    beforeUnmount?(world: World): void,
    destroy?(): void
}

export class Scene implements IScene {
    worldRef: World;
    entities: Entity[];

    destroy: () => void;
    initialize: (world: World) => void;
    beforeSystem: (system: System) => void;
    afterSystem: (system: System) => void;
    beforeMount: (world: World) => void;
    beforeUnmount: (world: World) => void;
    beforeFrame: (delta: number) => void;
    afterFrame: (delta:number)=> void;

    constructor(creatorFn?: () => SceneHandlers) {
        let noop: any = () => { };
        let options = creatorFn ? creatorFn() : {};
        this.destroy = options.destroy || noop;
        this.beforeSystem = options.beforeSystem || noop;
        this.afterSystem = options.afterSystem || noop;
        this.initialize = options.initialize || noop;
        this.beforeMount = options.beforeMount || noop;
        this.beforeUnmount = options.beforeUnmount || noop;
        this.beforeFrame = options.beforeFrame || noop;
        this.afterFrame = options.afterFrame || noop;
        this.entities = [];
    }
}
