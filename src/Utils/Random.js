class Random {
    static double() {
        return Math.random();
    }

    static int(min, max) {
        var i = Math.floor(max - min);
        return Math.floor(min) + i;
    }

    static uuid() {
        var uuid = [
            Random.int(0, 16).toString(16),
            Random.int(0, 16).toString(16),
            Random.int(0, 16).toString(16),
            Random.int(0, 16).toString(16),
            "-",
            Random.int(0, 16).toString(16),
            Random.int(0, 16).toString(16),
            Random.int(0, 16).toString(16),
            Random.int(0, 16).toString(16),
            "-",
            Random.int(0, 16).toString(16),
            Random.int(0, 16).toString(16),
            Random.int(0, 16).toString(16),
            Random.int(0, 16).toString(16),
            "-",
            Random.int(0, 16).toString(16),
            Random.int(0, 16).toString(16),
            Random.int(0, 16).toString(16),
            Random.int(0, 16).toString(16)
        ].join("");
        return uuid;
    }

    constructor() {
        throw new Error("Not to be instantiated.");
    }
}

module.exports = Random;
