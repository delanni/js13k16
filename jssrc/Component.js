"use strict";
var Component = (function () {
    function Component(id, componentKey, value) {
        if (value === void 0) { value = null; }
        this.id = id;
        this.componentKey = componentKey;
        if (value === null) {
            this._hasValue = false;
        }
        else {
            this._hasValue = true;
            this._value = value;
        }
        this.name = componentKey.componentName;
        this.defaultValue = componentKey.defaultValue;
    }
    Component.prototype.clear = function () {
        this._hasValue = false;
        this._value = undefined;
    };
    Object.defineProperty(Component.prototype, "value", {
        get: function () {
            if (this.hasValue) {
                return this._value;
            }
            else {
                return this.defaultValue;
            }
        },
        set: function (value) {
            this._value = value;
            this._hasValue = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "hasValue", {
        get: function () {
            return this._hasValue;
        },
        enumerable: true,
        configurable: true
    });
    return Component;
}());
exports.Component = Component;
