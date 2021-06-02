// name:    app.js
// author:  Jos Feenstra
// purpose: small helper class to do some perf testing

export class Stopwatch {
    constructor(oldTime, newTime) {}

    static new() {
        let s = new Stopwatch(0, 0);
        s.time();
        return s;
    }

    time() {
        this.newTime = this._getTime();
        let timePast = this.newTime - this.oldTime;
        this.oldTime = this.newTime;
        return timePast;
    }

    log(event) {
        console.log(`${event} took: ${this.time()} ms`);
    }

    _getTime() {
        return new Date().getTime();
    }
}
