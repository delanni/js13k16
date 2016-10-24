"use strict";
var Scene_1 = require("./Scene");
var World = (function () {
    function World() {
        this._currentTime = 0;
        this.systems = [];
        this.timeFactor = 1.0;
        this.currentScene = new Scene_1.Scene();
        this.scenes = {};
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
        this.currentScene.beforeFrame(delta);
        this.applySystems(delta);
        this.currentScene.afterFrame(delta);
    };
    World.prototype.applySystems = function (deltaTime) {
        var _this = this;
        var entities = this.currentScene.entities;
        this.systems.forEach(function (system) {
            system.beforeRun(deltaTime);
            var scene = _this.currentScene;
            scene.beforeSystem(system);
            var targetEntities;
            var predicate = system.entityPredicate;
            if (!predicate) {
                targetEntities = entities;
            }
            else {
                targetEntities = entities.filter(predicate);
            }
            targetEntities.forEach(function (entity) {
                system.applyToEntity(deltaTime, entity);
            });
            scene.afterSystem(system);
        });
    };
    World.prototype.addScene = function (sceneName, scene) {
        scene.initialize(this);
        this.scenes[sceneName] = scene;
    };
    World.prototype.setScene = function (sceneName) {
        var oldScene = this.currentScene;
        var newScene = this.scenes[sceneName];
        if (newScene) {
            newScene.beforeMount(this);
        }
        if (oldScene) {
            oldScene.beforeUnmount(this);
        }
        this.currentScene = newScene;
    };
    return World;
}());
exports.World = World;
