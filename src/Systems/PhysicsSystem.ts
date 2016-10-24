import {TimedVector2} from "../Math/TimedVector";
import {ComponentKey} from "../ComponentKey";
import {Entity} from "../Entity";
import {System} from "../System";
import {Vector2} from "../Math/Vector";

export class PhysicsSystem implements System {
    public name: string;
    public static massComponentKey: ComponentKey<number> = new ComponentKey<number>("mass", 0);
    public static forceComponentKey: ComponentKey<TimedVector2> = new ComponentKey<TimedVector2>("force", new TimedVector2());
    public static accelerationComponentKey: ComponentKey<Vector2> = new ComponentKey<Vector2>("acceleration", new Vector2());
    public static speedComponentKey: ComponentKey<Vector2> = new ComponentKey<Vector2>("speed", new Vector2());
    public static positionComponentKey: ComponentKey<Vector2> = new ComponentKey<Vector2>("position", new Vector2());

    constructor(/* all the needed */) {

    }

    public initialize() {

    }

    public beforeRun(delta: number) {

    }

    public afterRun(delta: number) {

    }

    public applyToEntity(delta: number, entity: Entity) {
        let sizer = 150;

        let massComponent = entity.getComponent(PhysicsSystem.massComponentKey);
        let forceComponent = entity.getComponent(PhysicsSystem.forceComponentKey);
        let accelerationComponent = entity.getComponent(PhysicsSystem.accelerationComponentKey);
        let speedComponent = entity.getComponent(PhysicsSystem.speedComponentKey);
        let positionComponent = entity.getComponent(PhysicsSystem.positionComponentKey);

        if (massComponent && massComponent.hasValue &&
            forceComponent && forceComponent.hasValue &&
            accelerationComponent && accelerationComponent.hasValue) {
            let forceVector = forceComponent.value.getFor(delta);
            accelerationComponent.value = accelerationComponent.value.add(forceVector.scale(1 / massComponent.value * delta));
        }  

        if (accelerationComponent && accelerationComponent.hasValue &&
            speedComponent && speedComponent.hasValue) {
            speedComponent.value = speedComponent.value.add(accelerationComponent.value.scale(delta / sizer));
        }

        if (speedComponent && speedComponent.hasValue &&
            positionComponent && positionComponent.hasValue) {
            positionComponent.value = positionComponent.value.add(speedComponent.value.scale(delta / sizer));
        }
    }
}
