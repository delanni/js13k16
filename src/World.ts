import {IScene, Scene} from "./Scene";
import {Entity} from "./Entity";
import {System} from "./System";

export class World {
    _boundGameLoop: FrameRequestCallback;
    timeFactor: number;
    systems: System[];

    currentScene: IScene;
    scenes: {[sceneName: string]: IScene};

    constructor() {
        this.systems = [];
        this.timeFactor = 1.0;
        this.currentScene = new Scene();
        this.scenes = {};
    }

    public initSystems() {
        this.systems.forEach(x => x.initialize());
    }

    public addSystem(system: System) {
        this.systems.push(system);
    }

    public startGameLoop() {
        console.log("Starting");
        this._boundGameLoop = this.gameLoop.bind(this);
        this.gameLoop(0);
    }

    public stopGameLoop(){
        this._boundGameLoop = function(time: number){};
        console.log("Stopping");
    }

    private _currentTime = 0;
    private gameLoop(time: number) {
        requestAnimationFrame(this._boundGameLoop);

        let delta = time-this._currentTime;
        this._currentTime = time;

        delta *= this.timeFactor;

        this.currentScene.beforeFrame(delta);
        this.applySystems(delta);
        this.currentScene.afterFrame(delta);
    }

    private applySystems(deltaTime: number) {
        let entities = this.currentScene.entities;

        this.systems.forEach(system => {
            system.beforeRun(deltaTime)

            let scene = this.currentScene;
            scene.beforeSystem(system);

            let targetEntities;
            let predicate = system.entityPredicate;
            if (!predicate){
                targetEntities = entities;
            } else {
                targetEntities = entities.filter(predicate);
            }
            targetEntities.forEach(entity => {
                system.applyToEntity(deltaTime, entity);
            });

            scene.afterSystem(system);
        });
    }

    public addScene(sceneName: string, scene: IScene){
        scene.initialize(this);
        this.scenes[sceneName] = scene;
    }
    public setScene(sceneName: string){
        let oldScene = this.currentScene;
        let newScene = this.scenes[sceneName];
        if (newScene){
            newScene.beforeMount(this);
        }
        if (oldScene){
            oldScene.beforeUnmount(this);
        }
        this.currentScene = newScene;
    }
}
