import {Vector2} from "./Vector";

export class TimedVector2 {
    public life: number;
    private fullLife: number;
    public innerVector: Vector2;

    constructor(x: number = 0, y: number = 0, life: number = 0){
        this.innerVector = new Vector2(x,y);
        this.life = life;
        this.fullLife = life;
    }

    public get isAlive():boolean{
        return this.life > 0;
    }

    public decay(delta: number){
        if (!this.isAlive) return;
        this.life -= delta;
        if (this.life <=0){
            console.log("vector depleted");
        }
    }

    public getFor(delta: number): Vector2 {
        let actualMaxAmt = Math.max(0,Math.min(this.life, delta));
        let vector = this.innerVector.scale(actualMaxAmt / this.fullLife);
        this.decay(actualMaxAmt);
        return vector;
    }

    public getForNoDecay(delta: number): Vector2 {
        let actualMaxAmt = Math.max(0,Math.min(this.life, delta));
        let vector = this.innerVector.scale(actualMaxAmt / this.fullLife);
        return vector;
    }
}
