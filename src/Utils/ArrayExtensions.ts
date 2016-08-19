export function dropElement<T>(array: T[], element: T): T {
    var idx = array.indexOf(element);
    if (idx > -1) {
        array.splice(idx, 1);
    }
    return element;
}
