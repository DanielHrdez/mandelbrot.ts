import { Complex } from './complex.js';
export class Mandelbrot {
    constructor(maxIterations = 100) {
        this.maxIterations = maxIterations;
    }
    toString() {
        return `Max iterations: ${this.maxIterations}`;
    }
    calculate(complex) {
        let result = complex;
        for (let i = 1; i <= this.maxIterations; i++) {
            result = result.mul(result).add(complex);
            if (result.abs() > 2)
                return i;
        }
        return this.maxIterations;
    }
    draw(canvas) {
        const context = canvas.getContext('2d');
        const imageData = context === null || context === void 0 ? void 0 : context.getImageData(0, 0, canvas.width, canvas.height);
        this.calculatePixels(imageData.data, canvas.width);
        context === null || context === void 0 ? void 0 : context.putImageData(imageData, 0, 0);
    }
    calculatePixels(pixels, width) {
        const maxRGBA = 255;
        const channels = 4;
        for (let i = 0; i < pixels.length; i += channels) {
            const complex = new Complex(i, i % (channels * width));
            const result = this.calculate(complex);
            const color = result * maxRGBA / this.maxIterations;
            pixels[i] = color;
            pixels[i + 1] = color;
            pixels[i + 2] = color;
            pixels[i + 3] = maxRGBA;
        }
    }
}
