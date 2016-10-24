"use strict";
var ArrayExtensions_1 = require("./Utils/ArrayExtensions");
var Scene_1 = require("./Scene");
var PhysicsDebugRenderer_1 = require("./Systems/PhysicsDebugRenderer");
var PhysicsSystem_1 = require("./Systems/PhysicsSystem");
var Pixel_1 = require("./Entities/Pixel");
var RendererSystem_1 = require("./Systems/RendererSystem");
var World_1 = require("./World");
var MathExtensions_1 = require("./Utils/MathExtensions");
var Vector_1 = require("./Math/Vector");
var world = new World_1.World();
var canvas = document.getElementById("gameCanvas");
var rendererSystem = new RendererSystem_1.RendererSystem("canvasRenderer", canvas);
var physicsSystem = new PhysicsSystem_1.PhysicsSystem();
var debugRenderSystem = new PhysicsDebugRenderer_1.PhysicsDebugRenderer("debugRenderer", canvas);
world.addSystem(rendererSystem);
world.addSystem(physicsSystem);
// world.addSystem(debugRenderSystem);
world.initSystems();
var canvasSize = {
    x: canvas.width,
    y: canvas.height
};
world.addScene("stars", new Scene_1.Scene(function () {
    var pixels = [];
    var functions = {
        initialize: function (world) {
            for (var i = 0; i < 10000; i++) {
                var size = (Math.random() * Math.random() * Math.random() * 10);
                var pixel = new Pixel_1.Pixel({
                    x: MathExtensions_1.MathExtensions.randomInt(-1000, canvasSize.x),
                    y: MathExtensions_1.MathExtensions.randomInt(0, canvasSize.y),
                    size: size
                });
                this.entities.push(pixel);
                // debugRenderSystem.initializeEntity(pixel);
                pixels.push(pixel);
                // pixel.setComponentValue(PhysicsSystem.forceComponentKey, new TimedVector2(0.4, 0, 1000));
                pixel.setComponentValue(PhysicsSystem_1.PhysicsSystem.speedComponentKey, new Vector_1.Vector2(size * size, 0));
            }
        },
        beforeMount: function (world) {
            pixels.forEach(function (p) {
                p.setComponentValue(PhysicsSystem_1.PhysicsSystem.positionComponentKey, new Vector_1.Vector2(MathExtensions_1.MathExtensions.randomInt(-1000, canvasSize.x), MathExtensions_1.MathExtensions.randomInt(0, canvasSize.y)));
            });
        }
    };
    return functions;
}));
world.addScene("sizers", new Scene_1.Scene(function () {
    var pixels = [];
    var maxSize = canvasSize.y;
    var numberOfSquares = 40;
    var decrement = maxSize / 40;
    var handlers = {
        initialize: function (world) {
            // for(var i=0;i < numberOfSquares; i++){
            //     let p = new Pixel({
            //         x: canvasSize.x /2,
            //         y: canvasSize.y /2,
            //         size: maxSize-i*decrement,
            //         color: "#" + times(3, ()=> MathExtensions.randomInt(0x10,250)).map(x=>x.toString(16)).join("")
            //     });
            //     pixels.push(p);
            //     this.entities.push(p);
            // }
            this.entities.push(new Pixel_1.Pixel({
                x: canvasSize.x,
                y: canvasSize.y,
                size: maxSize,
                color: "#" + ArrayExtensions_1.times(3, function () { return MathExtensions_1.MathExtensions.randomInt(0x10, 250); }).map(function (x) { return x.toString(16); }).join("")
            }));
        },
        beforeFrame: function (delta) {
            this.entities.push(this.entities.shift());
        }
    };
    return handlers;
}));
world.setScene("stars");
setInterval(function () {
    if (((Date.now() / 5000) | 0) % 2 == 1) {
        world.setScene("stars");
    }
    else {
        world.setScene("sizers");
    }
}, 5000);
world.startGameLoop();
