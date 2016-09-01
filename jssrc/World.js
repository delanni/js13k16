"use strict";
var World = (function () {
    function World() {
        this._currentTime = 0;
        this.systems = [];
        this.timeFactor = 1.0;
    }
    World.prototype.initSystems = function () {
        this.systems.forEach(function (x) { return x.initialize(); });
    };
    World.prototype.addSystem = function (system) {
        this.systems.push(system);
    };
    World.prototype.startGameLoop = function () {
        console.log("Starting");
        this._boundGameLoop = this.gameLoop.bind(this);
        this.gameLoop(0);
    };
    World.prototype.stopGameLoop = function () {
        this._boundGameLoop = function (time) { };
        console.log("Stopping");
    };
    World.prototype.gameLoop = function (time) {
        requestAnimationFrame(this._boundGameLoop);
        var delta = time - this._currentTime;
        this._currentTime = time;
        delta *= this.timeFactor;
        this.applySystems(delta);
    };
    World.prototype.applySystems = function (deltaTime) {
        this.systems.forEach(function (x) { return x.run(deltaTime); });
    };
    return World;
}());
exports.World = World;
