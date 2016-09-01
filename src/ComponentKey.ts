import {Component} from "./Component";

export class ComponentKey <T> {
    public static VISIBILITY = new ComponentKey<boolean>("visibility", false);

    private static componentKeyDirectory: {[key: string] : ComponentKey<any> }

    private keyBase:string;

    key:string;
    componentName: string;
    defaultValue:T;

    constructor(key: string, defaultValue: any){
        this.keyBase = key;
        this.key = key + "_key";
        this.componentName = key + "_component";
        this.defaultValue = defaultValue;
    }

    public static create<T>(key: string, defaultValue: T){
        if (!ComponentKey.componentKeyDirectory[key]){
            ComponentKey.componentKeyDirectory[key] = new ComponentKey(key, defaultValue);
        }
        return ComponentKey.componentKeyDirectory[key];
    }

    public static get<T>(key: string): ComponentKey<T>{
        return ComponentKey.componentKeyDirectory[key];
    }
}
