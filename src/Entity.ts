import {ComponentKey} from "./ComponentKey";
import { Component } from './Component';
import * as ArrayExtensions from './Utils/ArrayExtensions';

export class Entity {
    private components: { [id: string]: Component<any> };
    private componentKeys: string[];
    private name: string;
    public children: Entity[];
    public parent: Entity;

    constructor(name: string, parent: Entity = null) {
        this.name = name;
        this.components = {};
        this.componentKeys = [];
        this.parent = parent;
        this.children = [];
    }

    addComponent<T>(component: Component<T>) {
        this.components[component.componentKey.key] = component;
        this.componentKeys.push(component.name);
    }

    getComponent<T>(componentKey: ComponentKey<T>): Component<T> {
        return this.components[componentKey.key];
    }

    getComponentValue<T>(componentKey: ComponentKey<T>): T {
        let component = this.getComponent(componentKey);
        return component && component.value;
    }

    setComponentValue<T>(componentKey: ComponentKey<T>, newValue: T){
        if (!this.hasComponent(componentKey)){
            let component = new Component<T>(componentKey.key, componentKey, newValue);
            this.addComponent(component);
        } else {
            let component = this.getComponent(componentKey);
            if (component.hasValue){
                component.value = newValue;
            }
        }
    }

    removeComponent(componentKeyName) {
        var c = this.components[componentKeyName];
        this.components[componentKeyName] = null;
        ArrayExtensions.dropElement(this.componentKeys, componentKeyName);
        return c;
    }

    public hasComponent<T>(componentKey: ComponentKey<T>): boolean {
        return (!!this.components[componentKey.key]);
    }
}
