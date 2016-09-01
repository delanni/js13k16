"use strict";
var ArrayExtensions = require('./Utils/ArrayExtensions');
var Entity = (function () {
    function Entity(name) {
        this.name = name;
        this.components = {};
        this.componentKeys = [];
    }
    Entity.prototype.addComponent = function (component) {
        this.components[component.componentKey.key] = component;
        this.componentKeys.push(component.name);
    };
    Entity.prototype.getComponent = function (componentKey) {
        return this.components[componentKey.key];
    };
    Entity.prototype.getComponentValue = function (componentKey) {
        var component = this.getComponent(componentKey);
        return component.value;
    };
    Entity.prototype.removeComponent = function (name) {
        var c = this.components[name];
        this.components[name] = null;
        ArrayExtensions.dropElement(this.componentKeys, name);
        return c;
    };
    return Entity;
}());
exports.Entity = Entity;
