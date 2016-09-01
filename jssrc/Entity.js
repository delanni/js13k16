"use strict";
var ComponentKey_1 = require("./ComponentKey");
var ArrayExtensions = require('./Utils/ArrayExtensions');
var Entity = (function () {
    function Entity(name) {
        this.name = name;
        this.components = {};
        this.componentKeys = [];
    }
    Entity.prototype.addComponent = function (name, component) {
        this.components[name] = component;
        this.componentKeys.push(name);
        var x = this.getComponent(ComponentKey_1.ComponentKey.VISIBILITY);
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
