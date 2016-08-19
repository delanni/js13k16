System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var World;
    return {
        setters:[],
        execute: function() {
            World = (function () {
                function World(multi) {
                    this.nm = 4;
                }
                return World;
            }());
            exports_1("World", World);
        }
    }
});
