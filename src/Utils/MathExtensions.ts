
export class MathExtensions {
    public static randomInt(min: number, max:number){
        return ((Math.random()*(max-min))+min)|0;
    }
}
