import {ComponentKey} from "../ComponentKey";
import {Arrow} from "../Entities/Arrow";
import {Component} from "../Component";
import {PhysicsSystem} from "../Systems/PhysicsSystem";
import {Entity} from "../Entity";
import {TimedVector2} from "../Math/TimedVector";
import {Vector2} from "../Math/Vector";

export class PhysicsDebugComponent {
    public static physicsDebugComponentKey: ComponentKey<PhysicsDebugComponent> = ComponentKey.create<PhysicsDebugComponent>("physicsDebug", null);

    public speedVector: Arrow<Component<Vector2>>;
    public accelerationVector: Arrow<Component<Vector2>>;
    public forceVector: Arrow<Component<TimedVector2>>;
    public speedComponent: Component<Vector2>;
    public accelerationComponent: Component<Vector2>;
    public forceComponent: Component<TimedVector2>;

    constructor(entity: Entity){
        if (entity.hasComponent(PhysicsSystem.speedComponentKey)){
            this.speedComponent = entity.getComponent(PhysicsSystem.speedComponentKey);
            this.speedVector = new Arrow(this.speedComponent, c=> c.value.scale(100), "#cc0000");
            entity.children.push(this.speedVector);
        }
        if (entity.hasComponent(PhysicsSystem.accelerationComponentKey)){
            this.accelerationComponent = entity.getComponent(PhysicsSystem.accelerationComponentKey);
            this.accelerationVector = new Arrow(this.accelerationComponent, c=>c.value.scale(100), "#00cc00");
            entity.children.push(this.accelerationVector);
        }
        if (entity.hasComponent(PhysicsSystem.forceComponentKey)){
            this.forceComponent = entity.getComponent(PhysicsSystem.forceComponentKey);
            this.forceVector = new Arrow(this.forceComponent, c=>c.value.getForNoDecay(c.value.life).scale(100), "#0000cc");
            entity.children.push(this.forceVector);
        }

        let component = new Component(PhysicsDebugComponent.physicsDebugComponentKey.key, PhysicsDebugComponent.physicsDebugComponentKey, this);
        entity.addComponent(component);
    }
}
