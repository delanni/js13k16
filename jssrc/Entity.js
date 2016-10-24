"use strict";
var Component_1 = require('./Component');
var ArrayExtensions = require('./Utils/ArrayExtensions');
var Entity = (function () {
    function Entity(name, parent) {
        if (parent === void 0) { parent = null; }
        this.name = name;
        this.components = {};
        this.componentKeys = [];
        this.parent = parent;
        this.children = [];
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
        return component && component.value;
    };
    Entity.prototype.setComponentValue = function (componentKey, newValue) {
        if (!this.hasComponent(componentKey)) {
            var component = new Component_1.Component(componentKey.key, componentKey, newValue);
            this.addComponent(component);
        }
        else {
            var component = this.getComponent(componentKey);
            if (component.hasValue) {
                component.value = newValue;
            }
        }
    };
    Entity.prototype.removeComponent = function (componentKeyName) {
        var c = this.components[componentKeyName];
        this.components[componentKeyName] = null;
        ArrayExtensions.dropElement(this.componentKeys, componentKeyName);
        return c;
    };
    Entity.prototype.hasComponent = function (componentKey) {
        return (!!this.components[componentKey.key]);
    };
    return Entity;
}());
exports.Entity = Entity;
