"use strict";
function dropElement(array, element) {
    var idx = array.indexOf(element);
    if (idx > -1) {
        array.splice(idx, 1);
    }
    return element;
}
exports.dropElement = dropElement;
