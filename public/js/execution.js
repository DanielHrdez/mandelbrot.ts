import { Mandelbrot } from './mandelbrot.js';
var initialIterations = 100;
var mandelbrot = new Mandelbrot(initialIterations);
function execute() {
    var canvas = document.getElementById('mandelbrot');
    mandelbrot.draw(canvas);
}
window.onload = execute;
