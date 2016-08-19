System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Component;
    return {
        setters:[],
        execute: function() {
            Component = (function () {
                function Component(id, componentName) {
                    this.id = id;
                    this.componentName = componentName;
                    this.id = id;
                    this.componentName = componentName;
                    // this.internalId = Random.uuid();
                }
                return Component;
            }());
            exports_1("Component", Component);
        }
    }
});
