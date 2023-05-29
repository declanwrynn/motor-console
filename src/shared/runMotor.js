const { setInterval } = require('timers');
const { setTimeout } = require('timers');

var Gpio = require('onoff').Gpio;
var DIR = new Gpio(15, 'out');
var STEP = new Gpio(14, 'out');
var CW = 1;
var CCW = 0;

function wait(ms) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
      now = Date.now();
    }
}

function step(y, count) {
    var rep = 0;
    for (let x=0; x<y; x++) {
        STEP.writeSync(1);
        wait(5);
        STEP.writeSync(0);
        wait(5);
    }
    rep++;
    if (rep < count) {
        return {btnText: "NEXT"}
    } else {
        return {btnText: "FINISHED"}
    };
};

step()