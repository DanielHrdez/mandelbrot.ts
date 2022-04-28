import { Mandelbrot } from './mandelbrot.js';
const initialIterations = 100;
const mandelbrot = new Mandelbrot(initialIterations);
window.onload = () => {
    const canvas = document.getElementById('mandelbrot');
    mandelbrot.draw(canvas);
};
