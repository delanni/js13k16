import {ComponentKey} from "./ComponentKey";
import { Component } from './Component';
import * as ArrayExtensions from './Utils/ArrayExtensions';

export class Entity {
    private components: { [id: string]: Component<any> };
    private componentKeys: string[];
    private name: string;

    constructor(name: string) {
        this.name = name;
        this.components = {};
        this.componentKeys = [];
    }

    addComponent(name, component) {
        this.components[name] = component;
        this.componentKeys.push(name);

        let x = this.getComponent(ComponentKey.VISIBILITY);
    }

    getComponent<T>(componentKey: ComponentKey<T>): Component<T> {
        return this.components[componentKey.key];
    }

    getComponentValue<T>(componentKey: ComponentKey<T>): T {
        let component = this.getComponent(componentKey);
        return component.value;
    }

    removeComponent(name) {
        var c = this.components[name];
        this.components[name] = null;
        ArrayExtensions.dropElement(this.componentKeys, name);
        return c;
    }
}
