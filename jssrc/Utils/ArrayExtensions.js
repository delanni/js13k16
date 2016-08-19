System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function dropElement(array, element) {
        var idx = array.indexOf(element);
        if (idx > -1) {
            array.splice(idx, 1);
        }
        return element;
    }
    exports_1("dropElement", dropElement);
    return {
        setters:[],
        execute: function() {
        }
    }
});
