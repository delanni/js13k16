export function dropElement<T>(array: T[], element: T): T {
    var idx = array.indexOf(element);
    if (idx > -1) {
        array.splice(idx, 1);
    }
    return element;
}

export function times<T>(n: number, generator: (i?:number)=>T): T[] {
    let result: T[] = [];

    for(var i=0;i<n;i++){
        result.push(generator(i));
    }

    return result;
}
