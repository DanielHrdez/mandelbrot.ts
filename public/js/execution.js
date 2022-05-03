import { Mandelbrot } from './mandelbrot.js';
window.onload = () => {
    const initialIterations = 200;
    const canvas = document.getElementById('mandelbrot');
    const mandelbrot = new Mandelbrot(canvas, initialIterations);
    mandelbrot.draw(initialIterations * 1e3);
};
