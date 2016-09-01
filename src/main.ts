import {RendererSystem} from "./Systems/RendererSystem";
import { Component } from "./Component";
import { World } from "./World";
import { Entity } from "./Entity";

let world = new World();
// let e = new Entity("entityname");
// let c = new Component("alma", "korte");
// let s = new System("systemname");

let canvas = <HTMLCanvasElement>document.getElementById("gameCanvas");
let rendererSystem = new RendererSystem("canvasRenderer", canvas);

world.addSystem(rendererSystem);

world.initSystems();

world.startGameLoop();
