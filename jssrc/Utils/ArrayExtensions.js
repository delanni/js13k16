"use strict";
function dropElement(array, element) {
    var idx = array.indexOf(element);
    if (idx > -1) {
        array.splice(idx, 1);
    }
    return element;
}
exports.dropElement = dropElement;
function times(n, generator) {
    var result = [];
    for (var i = 0; i < n; i++) {
        result.push(generator(i));
    }
    return result;
}
exports.times = times;
