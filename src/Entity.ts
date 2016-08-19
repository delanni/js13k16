import { Component } from './Component';
import * as ArrayExtensions from './Utils/ArrayExtensions';

export class Entity {
    private components: { [id: string]: Component };
    private componentKeys: string[];

    constructor() {
        this.components = {};
        this.componentKeys = [];
    }

    addComponent(name, component) {
        this.components[name] = component;
        this.componentKeys.push(name);
    }

    getComponent(name) {
        return this.components[name];
    }

    removeComponent(name) {
        var c = this.components[name];
        this.components[name] = null;
        ArrayExtensions.dropElement(this.componentKeys, name);
        return c;
    }
}
