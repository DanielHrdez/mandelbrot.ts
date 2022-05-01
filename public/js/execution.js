import { Mandelbrot } from './mandelbrot.js';
window.onload = () => {
    const initialIterations = 200;
    const canvas = document.getElementById('mandelbrot');
    const area = document.getElementById('mandelbrot-area');
    const mandelbrot = new Mandelbrot(canvas, initialIterations);
    mandelbrot.draw();
    area.textContent += mandelbrot.getArea().toString();
};
