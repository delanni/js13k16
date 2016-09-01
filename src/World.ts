import {System} from "./System";

export class World {
    _boundGameLoop: FrameRequestCallback;
    timeFactor: number;
    systems: System[];

    constructor() {
        this.systems = [];
        this.timeFactor = 1.0;
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

        this.applySystems(delta);
    }

    private applySystems(deltaTime: number) {
        this.systems.forEach(x => x.run(deltaTime));
    }
}
