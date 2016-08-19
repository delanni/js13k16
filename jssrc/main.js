System.register(["./Component", "./World", "./Entity"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Component_1, World_1, Entity_1;
    var w, e, c;
    return {
        setters:[
            function (Component_1_1) {
                Component_1 = Component_1_1;
            },
            function (World_1_1) {
                World_1 = World_1_1;
            },
            function (Entity_1_1) {
                Entity_1 = Entity_1_1;
            }],
        execute: function() {
            w = new World_1.World(4.111);
            e = new Entity_1.Entity();
            c = new Component_1.Component("alma", "korte");
        }
    }
});
