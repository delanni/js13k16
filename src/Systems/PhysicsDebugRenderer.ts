import {PhysicsDebugComponent} from "../Components/PhysicsDebugComponent";
import {EntityDrawer} from "../Components/EntityDrawer";
import {ComponentKey} from "../ComponentKey";
import {Component} from "../Component";
import {Entity} from "../Entity";
import {System} from "../System";
import {PhysicsSystem} from "./PhysicsSystem";

const CLEAR_COLOR = "#000000"

export class PhysicsDebugRenderer implements System {
    private drawerComponentKey: ComponentKey<EntityDrawer>;
    canvasHeight: number;
    canvasWidth: number;
    name: string;

    public initialize() {

        this.drawerComponentKey = EntityDrawer.componentKey;

        console.log(`PhysicsDebugRenderer ${this.name} initialized.`);
    }

    public initializeEntity(entity: Entity){
        let physicsDebugComponent = new PhysicsDebugComponent(entity);
    }

    public beforeRun(timeSlice: number) {
    }

    public applyToEntity(timeSlice: number, entity: Entity) {
    }

    public entityPredicate(entity: Entity): boolean {
        return false;
    }

    public constructor(name: string, targetCanvas: HTMLCanvasElement) {
        this.name = name;
        // this.canvas = targetCanvas;
    }
}
