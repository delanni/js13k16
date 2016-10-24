import {times} from "./Utils/ArrayExtensions";
import {Scene, SceneHandlers} from "./Scene";
import {PhysicsDebugRenderer} from "./Systems/PhysicsDebugRenderer";
import {PhysicsSystem} from "./Systems/PhysicsSystem";
import {Pixel} from "./Entities/Pixel";
import {RendererSystem} from "./Systems/RendererSystem";
import { Component } from "./Component";
import { World } from "./World";
import { Entity } from "./Entity";
import {MathExtensions} from "./Utils/MathExtensions";
import {Vector2} from "./Math/Vector";
import {TimedVector2} from "./Math/TimedVector";

let world = new World();

let canvas = <HTMLCanvasElement>document.getElementById("gameCanvas");
let rendererSystem = new RendererSystem("canvasRenderer", canvas);
let physicsSystem = new PhysicsSystem();
let debugRenderSystem = new PhysicsDebugRenderer("debugRenderer", canvas);

world.addSystem(rendererSystem);
world.addSystem(physicsSystem);
// world.addSystem(debugRenderSystem);

world.initSystems();

let canvasSize = {
    x: canvas.width,
    y: canvas.height
}

world.addScene("stars", new Scene(function(){
    let pixels: Pixel[] = [];
    let functions: SceneHandlers = {
        initialize: function(world: World){
            for (var i = 0; i < 10000; i++) {
                let size = (Math.random()*Math.random()*Math.random()*10);
                let pixel = new Pixel({
                    x: MathExtensions.randomInt(-1000, canvasSize.x),
                    y: MathExtensions.randomInt(0, canvasSize.y),
                    size: size
                });
                this.entities.push(pixel);
                // debugRenderSystem.initializeEntity(pixel);
                pixels.push(pixel);
                // pixel.setComponentValue(PhysicsSystem.forceComponentKey, new TimedVector2(0.4, 0, 1000));
                pixel.setComponentValue(PhysicsSystem.speedComponentKey, new Vector2(size*size,0));
            }
        },
        beforeMount: function(world: World){
            pixels.forEach(p=>{
                p.setComponentValue(PhysicsSystem.positionComponentKey, new Vector2(MathExtensions.randomInt(-1000, canvasSize.x), MathExtensions.randomInt(0, canvasSize.y)));
            });
        }
    };
    return functions;
}));

world.addScene("sizers", new Scene(function(){
    let pixels: Pixel[] = [];

    let maxSize = canvasSize.y;
    let numberOfSquares = 40;
    let decrement = maxSize/40;

    let handlers: SceneHandlers = {
        initialize: function(world: World){
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
            this.entities.push(new Pixel({
                x: canvasSize.x,
                y: canvasSize.y,
                size: maxSize,
                color: "#" + times(3, ()=> MathExtensions.randomInt(0x10,250)).map(x=>x.toString(16)).join("")
            }));
        },
        beforeFrame: function(delta: number){
            this.entities.push(this.entities.shift());
        }
    };
    return handlers;
}));

world.setScene("stars");

setInterval(()=>{
    if (((Date.now() / 5000)|0) % 2 == 1){
        world.setScene("stars");
    } else {
        world.setScene("sizers");
    }
}, 5000);

world.startGameLoop();
