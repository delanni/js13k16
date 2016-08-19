System.register(['./Utils/ArrayExtensions'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ArrayExtensions;
    var Entity;
    return {
        setters:[
            function (ArrayExtensions_1) {
                ArrayExtensions = ArrayExtensions_1;
            }],
        execute: function() {
            Entity = (function () {
                function Entity() {
                    this.components = {};
                    this.componentKeys = [];
                }
                Entity.prototype.addComponent = function (name, component) {
                    this.components[name] = component;
                    this.componentKeys.push(name);
                };
                Entity.prototype.getComponent = function (name) {
                    return this.components[name];
                };
                Entity.prototype.removeComponent = function (name) {
                    var c = this.components[name];
                    this.components[name] = null;
                    ArrayExtensions.dropElement(this.componentKeys, name);
                    return c;
                };
                return Entity;
            }());
            exports_1("Entity", Entity);
        }
    }
});
